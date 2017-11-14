import {
    IGoogleMap,
    IGoogleMapProps,
    IGoogleMapStyles
} from './GoogleMap.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { getStyles } from './GoogleMap.styles'
import { supportedCountries, IconsForMap } from '../../MockData/FrontEndConsts'
import { Feature, LineString } from "geojson";

interface IStopCoords {
    "coordinates": number[];
}

interface IGoogleMapState {
    activeMarkers?: google.maps.Marker[];
    activeDirectionRenderers?: google.maps.DirectionsRenderer[];
}
const styles: IGoogleMapStyles = getStyles();

export class GoogleMap extends BaseComponent<IGoogleMapProps, IGoogleMapState> implements IGoogleMap {
    private _map: google.maps.Map;
    private _mapCanvas: HTMLDivElement;
    private _directionService: google.maps.DirectionsService;

    constructor(props: IGoogleMapProps) {
        super(props);
        this.state = {
            activeMarkers: [],
            activeDirectionRenderers: []
        };
    }

    public render() {
        return(
            <div ref={ this._resolveRef("_mapCanvas")} style={ styles.root } id="map"></div>
        )
    }

    public componentDidMount() {
        this._map = new google.maps.Map(this._mapCanvas,
            {
                center: new google.maps.LatLng(12.4150, -85.2362),
                zoom: 7
            }
        );
        this._directionService = new google.maps.DirectionsService();
    }

    public shouldComponentUpdate(newProps: IGoogleMapProps) {
        return newProps.locationCoords !== this.props.locationCoords;
    }

    public componentDidUpdate() {
        if(this.state.activeMarkers && this.state.activeMarkers[0] && this.state.activeMarkers[this.state.activeMarkers.length-1]) {
            // Update map on refresh to make sure it uses the correct viewport for the routes.
            let originMarker = this.state.activeMarkers[0].getPosition();
            let destinationMarker = this.state.activeMarkers[this.state.activeMarkers.length-1].getPosition();
            let NECorner = new google.maps.LatLng((originMarker.lat() > destinationMarker.lat() ? originMarker.lat() : destinationMarker.lat()), (originMarker.lng() < destinationMarker.lng() ? originMarker.lng() : destinationMarker.lng()));
            let SWCorner = new google.maps.LatLng((originMarker.lat() < destinationMarker.lat() ? originMarker.lat() : destinationMarker.lat()), (originMarker.lng() > destinationMarker.lng() ? originMarker.lng() : destinationMarker.lng()));            
            this._map.fitBounds(new google.maps.LatLngBounds(SWCorner, NECorner));
            console.log("ran did update")
        }
    }

    public componentWillReceiveProps(newProps: IGoogleMapProps): void {
        if(newProps.locationCoords && newProps.locationCoords.length > 1) {
            let activeMarkers: google.maps.Marker[] = [];
            let activeDirectionRenderers: google.maps.DirectionsRenderer[] = [];
            let stops:IStopCoords[] = [];
            let markerCoords = newProps.locationCoords;

            /**
             * Call setMap(null) on all rendered features of the google map to clear them
             */
            this.state.activeDirectionRenderers.forEach((directionRenderer)=>directionRenderer.setMap(null));
            this.state.activeMarkers.forEach((marker)=>marker.setMap(null));

            // Weird typescript issue that is solved by creating a variable called that when using the keyword this in async functions
            let that = this;

            /**
             * Check if we should use the info given to find a route to display for a search result else we will deal with a route being entered to the database
             */
            if(newProps.findRoute) {
                /**
                 * Make a call to the backend with our origin and destination to search for any matching routes. If found then display the origin and destination
                 * on the map as markers. Then use the response from the backend to create any matching route(s) on the map using the google direction service and renderer.
                 */
                fetch('/api/routes/find-near?latOrig='+markerCoords[0].lat()+'&lngOrig='+markerCoords[0].lng()+'&lngDest='+markerCoords[markerCoords.length-1].lng()+'&latDest='+markerCoords[markerCoords.length-1].lat()).then((response: any) => {
                    return response.json();
                }).then(function(responseJson){
                    /**
                     * Create new markers for our new origin and new destination and place them on the map
                     */
                    let originMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(markerCoords[0].lat(), markerCoords[0].lng())
                    });
                    originMarker.setMap(that._map)

                    let destinationMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(markerCoords[markerCoords.length-1].lat(), markerCoords[markerCoords.length-1].lng())
                    });
                    destinationMarker.setMap(that._map)

                    // Add the two markers to our active marker list so that we can remove them on later calls.
                    activeMarkers.push(originMarker);
                    activeMarkers.push(destinationMarker);

                    /**
                     * Use the response to create as many drawable routes on the google map as passed back in the response.
                     */
                    console.log("here")
                    responseJson.directions.forEach((response: any)=>{
                        let routeRequest: google.maps.DirectionsRequest;
                        let midStops = response.stops;
                        console.log(midStops);
                        let waypoints: google.maps.DirectionsWaypoint[] = [];
                        midStops.forEach((item: any)=>{
                            waypoints.push({location: new google.maps.LatLng(item.geometry.coordinates[0], item.geometry.coordinates[1]), stopover: false})
                        });
                        console.log(waypoints);
                        routeRequest = {
                            origin: new google.maps.LatLng(response.orig[0], response.orig[1]),
                            destination: new google.maps.LatLng(response.dest[0], response.dest[1]),
                            waypoints: waypoints,
                            travelMode: google.maps.TravelMode.DRIVING
                        }
                        that._directionService.route(routeRequest, (res, status) => {
                            if(status.toString() === 'OK') {
                                let directionRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();
                                directionRenderer.setMap(that._map);
                                directionRenderer.setDirections(res);
                                // Add the direction renderer to our list so that we can clear it on future map refreshes
                                activeDirectionRenderers.push(directionRenderer);
                            }
                        });
                    });
                    // Call setstate with updated tracker of displayed markers and routes on the map to trigger a component refresh.
                    that.setState({
                        activeMarkers: activeMarkers,
                        activeDirectionRenderers: activeDirectionRenderers
                    });
                    // Callback for after successful rendering of new markers and routes.
                    that.props.onDidRenderNewLocations(responseJson);
                }).catch((e)=>{
                    console.log(e);
                    that.state.activeMarkers.forEach((marker)=> {
                        marker.setMap(null);
                    });
                    that.props.onDidRenderNewLocations();
                    that._map.setOptions({
                        center: new google.maps.LatLng(12.4150, -85.2362),
                        zoom: 7
                    });
                    alert("No route found!");
                });
            }else {
                /**
                 * Following deals with if the map should instead display a route entered on the route entry page.
                 */
                let midStops = newProps.locationCoords.slice(0,newProps.locationCoords.length-1);
                let waypoints: google.maps.DirectionsWaypoint[] = [];
                midStops.forEach((item)=>{
                    waypoints.push({location: new google.maps.LatLng(item.lat(), item.lng()), stopover: false})
                });
                let request: google.maps.DirectionsRequest = {
                    origin: newProps.locationCoords[0],
                    waypoints: waypoints,
                    destination: newProps.locationCoords[newProps.locationCoords.length-1],
                    travelMode: google.maps.TravelMode.DRIVING
                }
                that._directionService.route(request, (res, status) => {
                    if(status.toString() === 'OK') {
                        let directionRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();
                        directionRenderer.setMap(that._map);
                        directionRenderer.setDirections(res);
                        this.setState({
                            activeDirectionRenderers: [directionRenderer]
                        });
                    }
                });
                if(newProps.routeProperties) {
                    let info = newProps.routeProperties;
                    let route = {
                        "stops" : newProps.locationCoords.map((coords)=> {return {"coordinates": [coords.lng(), coords.lat()]}}),
                        "name": info.name,
                        "cost": info.cost,
                        "times": [-1],
                        "duration": info.duration,
                        "notes": info.notes
                    }
                    fetch('/api/routes/create', {
                        method: 'post',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify(route)
                    }).then((res: any)=> res.json())
                }
            }
        }
    }
}
