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

interface IStopInfo {
    "coordinates": number[];
}

interface IGoogleMapState {
    activeMarkers?: google.maps.Marker[];
}
const styles: IGoogleMapStyles = getStyles();

export class GoogleMap extends BaseComponent<IGoogleMapProps, IGoogleMapState> implements IGoogleMap {
    private _map: google.maps.Map;
    private _mapCanvas: HTMLDivElement;
    private _geoCoder: google.maps.Geocoder;
    private _directionRenderer: google.maps.DirectionsRenderer;
    private _directionService: google.maps.DirectionsService;

    constructor(props: IGoogleMapProps) {
        super(props);
        this.state = {
            activeMarkers: []
        };
        this._geoCoder = new google.maps.Geocoder();
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
        this._directionRenderer = new google.maps.DirectionsRenderer();
        this._directionRenderer.setMap(this._map);
        this._directionService = new google.maps.DirectionsService();
    }

    public componentWillReceiveProps(newProps: IGoogleMapProps): void {
        if(newProps.locationAutocompletes) {
            console.log("in map")
            console.log(newProps.locationAutocompletes)
            let activeMarkers: google.maps.Marker[] = [];
            let counter = 0;
            let stops:IStopInfo[] = [];

            newProps.locationAutocompletes.forEach((autocomplete, index) => {
                let request: google.maps.GeocoderRequest = {
                    address: autocomplete.getPlace().formatted_address,
                    componentRestrictions: { country: supportedCountries[0] },
                }
                this._geoCoder.geocode(request,
                    (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) =>
                        {
                            stops.push({"coordinates": [results[0].geometry.location.lng(), results[0].geometry.location.lat()]})
                            let marker = new google.maps.Marker({
                                // map: this._map,
                                // icon: IconsForMap.origin,
                                position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
                            });
                            activeMarkers.push(marker);
                            counter++;
                            if(counter == newProps.locationAutocompletes.length) {
                                let that = this;
                                let originMarker = activeMarkers[0];
                                let destinationMarker = activeMarkers[activeMarkers.length-1];
                                if(newProps.findRoute) {
                                    fetch('/api/routes/find-near?latOrig='+originMarker.getPosition().lat()+'&lngOrig='+originMarker.getPosition().lng()+'&lngDest='+ destinationMarker.getPosition().lng()+'&latDest='+destinationMarker.getPosition().lat()).then((response: any) => {
                                        return response.json();
                                    }).then(function(responseJson){
                                        console.log(responseJson);
                                        //loop through array
                                        originMarker.setMap(that._map);
                                        destinationMarker.setMap(that._map);
                                        that.setState({
                                            activeMarkers: activeMarkers
                                        });
                                        let request: google.maps.DirectionsRequest;
                                        request = {
                                            origin: new google.maps.LatLng(responseJson.origin[0], responseJson.origin[1]),
                                            destination: new google.maps.LatLng(responseJson.destination[0], responseJson.destination[1]),
                                            travelMode: google.maps.TravelMode.DRIVING
                                        }
                                        that._directionService.route(request, (res, status) => {
                                            if(status.toString() === 'OK') {
                                                that._directionRenderer.setDirections(res);
                                            }
                                        });
                                        that._map.fitBounds(originMarker.getPosition().lng() < destinationMarker.getPosition().lng() ?
                                        new google.maps.LatLngBounds(originMarker.getPosition(), destinationMarker.getPosition()) :
                                        new google.maps.LatLngBounds(destinationMarker.getPosition(), originMarker.getPosition()));
                                    });
                                }else {
                                    let waypoints: google.maps.DirectionsWaypoint[] = []
                                    newProps.locationAutocompletes.slice(1,counter-1).forEach((item)=>{waypoints.push({location: item.getPlace().formatted_address, stopover: false})});
                                    let request: google.maps.DirectionsRequest = {
                                        origin: newProps.locationAutocompletes[0].getPlace().formatted_address,
                                        waypoints: waypoints,
                                        destination: newProps.locationAutocompletes[counter-1].getPlace().formatted_address,
                                        travelMode: google.maps.TravelMode.DRIVING
                                    }
                                    that._directionService.route(request, (res, status) => {
                                        if(status.toString() === 'OK') {
                                            that._directionRenderer.setDirections(res);
                                        }
                                    });
                                    that._map.fitBounds(originMarker.getPosition().lng() < destinationMarker.getPosition().lng() ?
                                    new google.maps.LatLngBounds(originMarker.getPosition(), destinationMarker.getPosition()) :
                                    new google.maps.LatLngBounds(destinationMarker.getPosition(), originMarker.getPosition()));
                                    if(newProps.storeRoute) {
                                        let route = {
                                            "stops" : stops,
                                            "name": newProps.locationAutocompletes[0].getPlace().name + '-' + newProps.locationAutocompletes[0].getPlace().name,
                                            "cost": 0,
                                            "times": [-1],
                                            "duration": 72,
                                            "notes": "blach blah blach"
                                        }
                                      fetch('/api/routes/create', {
                                        headers: {
                                            'Content-Type': 'application/json'
                                          },
                                          method: 'post',
                                          body: JSON.stringify(route)
                                      }).then((res)=> res.json())
                                    }
                                }
                            }
                        });
            });
        }
    }
}
