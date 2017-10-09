import {
    IGoogleMap,
    IGoogleMapProps,
    IGoogleMapStyles
} from './GoogleMap.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { getStyles } from './GoogleMap.styles'
import { sampleGeoJSON, supportedCountries } from '../../MockData/MockFrontEnd'
import { Feature, LineString } from "geojson";

interface IGoogleMapState {
    activeMarkers?: google.maps.Marker[];
}
const styles: IGoogleMapStyles = getStyles();

export class GoogleMap extends BaseComponent<IGoogleMapProps, IGoogleMapState> implements IGoogleMap {
    private _map: google.maps.Map;
    private _mapCanvas: HTMLDivElement;
    private _geoCoder: google.maps.Geocoder;

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
    }

    public componentWillReceiveProps(newProps: IGoogleMapProps): void {
        let latOrig: number;
        let lngOrig: number;
        let originRequest: google.maps.GeocoderRequest = {
            address: newProps.origin,
            componentRestrictions: { country: supportedCountries[0] },
        }

        let latDest: number;
        let lngDest: number;
        let destinationRequest: google.maps.GeocoderRequest = {
            address: newProps.destination,
            componentRestrictions: { country: supportedCountries[0] },
        }

        this._geoCoder.geocode(originRequest,
            (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) =>
                {
                    this.state.activeMarkers.forEach((marker: google.maps.Marker) => marker.setMap(null))                    
                    this._map.data.forEach((feature: google.maps.Data.Feature) => this._map.data.remove(feature));
                    latOrig = results[0].geometry.location.lat();
                    lngOrig = results[0].geometry.location.lng(); 
                    this._geoCoder.geocode(destinationRequest,
                        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) =>
                            {
                                latDest = results[0].geometry.location.lat();
                                lngDest = results[0].geometry.location.lng();
                                let originMarker = new google.maps.Marker({
                                    map: this._map,
                                    position: new google.maps.LatLng(latOrig, lngOrig)
                                });
                                let destinationMarker = new google.maps.Marker({
                                    map: this._map,
                                    position: new google.maps.LatLng(latDest, lngDest)
                                });
                                this.setState({
                                    activeMarkers: [originMarker, destinationMarker]
                                });
                                let that = this;
                                fetch('/api/routes/find-near?latOrig='+latOrig+'&lngOrig='+lngOrig+'&lngDest='+ lngDest+'&latDest='+latDest).then((response: any) => {
                                    return response.json();
                                }).then(function(responseJson){
                                    console.log(responseJson[0]);
                                    let routes: google.maps.Data.Feature[] = that._map.data.addGeoJson(responseJson[0]);
                                    let lastStopCoords = responseJson[0].geometry.coordinates[responseJson[0].geometry.coordinates.length-1];
                                    let lastStopLatLng: google.maps.LatLng = new google.maps.LatLng(lastStopCoords[1], lastStopCoords[0]);
                                    that._map.fitBounds(originMarker.getPosition().lng() < destinationMarker.getPosition().lng() ?
                                        new google.maps.LatLngBounds(originMarker.getPosition(), destinationMarker.getPosition()) :
                                        new google.maps.LatLngBounds(destinationMarker.getPosition(), originMarker.getPosition()));
                                });
                    });                      
        });
    }
}
