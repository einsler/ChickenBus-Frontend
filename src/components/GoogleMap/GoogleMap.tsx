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

interface IGoogleMapState {
    activeMarkers?: google.maps.Marker[];
    activePolyLines?: google.maps.Polyline[];
    bounds?: google.maps.LatLngBounds;
}
const styles: IGoogleMapStyles = getStyles();

export class GoogleMap extends BaseComponent<IGoogleMapProps, IGoogleMapState> implements IGoogleMap {
    private _map: google.maps.Map;
    private _mapCanvas: HTMLDivElement;

    constructor(props: IGoogleMapProps) {
        super(props);
        this.state = {
            activeMarkers: [],
            activePolyLines: []
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
    }

    public shouldComponentUpdate(newProps: IGoogleMapProps) {
        return newProps.locationCoords !== this.props.locationCoords;
    }

    public componentDidUpdate() {
        if(this.state.activeMarkers && this.state.activeMarkers[0] && this.state.activeMarkers[this.state.activeMarkers.length-1]) {
            // Update map on refresh to make sure it uses the correct viewport for the routes.
        }
    }

    public componentWillReceiveProps(newProps: IGoogleMapProps): void {
        if(newProps.locationCoords && newProps.locationCoords.length > 1) {
            let activeMarkers: google.maps.Marker[] = [];
            let activePolyLines: google.maps.Polyline[] = [];
            let markerCoords = newProps.locationCoords;

            /**
             * Call setMap(null) on all rendered features of the google map to clear them
             */
            this.state.activeMarkers.forEach((marker)=>marker.setMap(null));
            this.state.activePolyLines.forEach((polyLine)=>polyLine.setMap(null));

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
                    let map = that._map;
                    
                    let curvature: number = 0.4; // how curvy to make the arc
                    let bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
                    /**
                     * Use the response to create as many drawable routes on the google map as passed back in the response's direstions property.
                     */
                    responseJson.directions.forEach((directions: any, index: number)=>{
                            // This is the initial location of the origin and destination of each route passed back
                            let pos1 = new google.maps.LatLng(directions.orig[0], directions.orig[1]);
                            let pos2 = new google.maps.LatLng(directions.dest[0], directions.dest[1]);

                            // Store bounds
                            bounds.extend(pos1);
                            bounds.extend(pos2);
                            // Create markers for the routes
                            let markerP1 = new google.maps.Marker({
                                position: pos1,
                                label: (index + 1).toString(),
                                zIndex: 2,
                                map: map
                            });
                            var markerP2 = new google.maps.Marker({
                                position: pos2,
                                label: (index + 2).toString(),
                                zIndex: 1,
                                map: map
                            });

                            let curveMarker: google.maps.Marker;

                            activeMarkers.push(markerP1);
                            activeMarkers.push(markerP2);
                            
                                function updateCurveMarker() {
                                    var pos1 = markerP1.getPosition(), // latlng
                                        pos2 = markerP2.getPosition(),
                                        projection = map.getProjection(),
                                        p1 = projection.fromLatLngToPoint(pos1), // xy
                                        p2 = projection.fromLatLngToPoint(pos2);
                            
                                    // Calculate the arc.
                                    // To simplify the math, these points 
                                    // are all relative to p1:
                                    var e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
                                        m = new google.maps.Point(e.x / 2, e.y / 2), // midpoint
                                        o = new google.maps.Point(e.y, -e.x), // orthogonal
                                        c = new google.maps.Point( // curve control point
                                            m.x + curvature * o.x,
                                            m.y + curvature * o.y);
                            
                                    var pathDef = 'M 0,0 ' +
                                        'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;
                            
                                    var zoom = map.getZoom(),
                                        scale = 1 / (Math.pow(2, -zoom));
                            
                                    var symbol = {
                                        path: pathDef,
                                        scale: scale,
                                        strokeWeight: 2,
                                        fillColor: 'none'
                                    };
                            
                                    if (!curveMarker) {
                                        curveMarker = new google.maps.Marker({
                                            position: pos1,
                                            clickable: false,
                                            icon: symbol,
                                            zIndex: 0, // behind the other markers
                                            map: map
                                        });
                                        activeMarkers.push(curveMarker);
                                    } else {
                                        curveMarker.setOptions({
                                            position: pos1,
                                            icon: symbol,
                                        });
                                    }
                                }
                            
                                google.maps.event.addListener(map, 'projection_changed', updateCurveMarker);
                                google.maps.event.addListener(map, 'zoom_changed', updateCurveMarker);
                    });
                    that._map.fitBounds(bounds);
                    // Call setstate with updated tracker of displayed markers and routes on the map to trigger a component refresh.
                    that.setState({
                        activeMarkers: activeMarkers,
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
                 * Following deals with when the map should instead display a route entered on the route entry page.
                 */
                let map = that._map;
                
                let poly = new google.maps.Polyline({
                    strokeColor: '#000000',
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                    path: newProps.locationCoords
                  });
                poly.setMap(map);
                activePolyLines.push(poly);

                let bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();

                newProps.locationCoords.forEach((item, index)=>{
                   let marker = new google.maps.Marker({
                    position: item,
                    title: 'Stop ' + (index + 1),
                    map: map
                   });
                   activeMarkers.push(marker);
                   bounds.extend(item);
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
                    }).then((res: any)=> {
                        res.json();
                        alert("Added Route!"); 
                    })
                }
                this.setState({
                    activeMarkers: activeMarkers,
                    activePolyLines: activePolyLines
                });
                map.fitBounds(bounds);
            }
        }
    }
}