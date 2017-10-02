import {
    IGoogleMap,
    IGoogleMapProps,
    IGoogleMapStyles
} from './GoogleMap.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { getStyles } from './GoogleMap.styles'
import { sampleGeoJSON, supportedCountries } from '../../MockData/MockFrontEnd'

interface IGoogleMapState {
    mapOptions: google.maps.MapOptions;
}
const styles: IGoogleMapStyles = getStyles();

export class GoogleMap extends BaseComponent<IGoogleMapProps, IGoogleMapState> {
    private _map: google.maps.Map;
    private _mapCanvas: HTMLDivElement;
    private _geoCoder: google.maps.Geocoder;

    constructor(props: IGoogleMapProps) {
        super(props);

        this._geoCoder = new google.maps.Geocoder();

        this.state = {
            mapOptions: {
                center: new google.maps.LatLng(35.9132, -79.0558),
                zoom: 12
            }
        }
    }

    public render() {
        return(
            <div ref={ this._resolveRef("_mapCanvas")} style={ styles.root } id="map"></div>
        )
    }

    public componentDidMount() {
        this._map = new google.maps.Map(this._mapCanvas, this.state.mapOptions);
    }

    @autobind
    public componentWillReceiveProps(newProps: IGoogleMapProps) {
        let latOrig: number;
        let lngOrig: number;
        let originRequest: google.maps.GeocoderRequest = {
            address: newProps.origin,
            componentRestrictions: { country: supportedCountries[0] },
        }
        this._geoCoder.geocode(originRequest,
            (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) =>
                {
                    latOrig = results[0].geometry.location.lat();
                    lngOrig = results[0].geometry.location.lng();
                    let newMarker = new google.maps.Marker({
                        map: this._map,
                        position: new google.maps.LatLng(latOrig, lngOrig)
                    });
                    console.log(this._map);
                    this.setState({
                        mapOptions: {
                            center: new google.maps.LatLng(latOrig, lngOrig)
                        }
                    })
                    this._map.setCenter(this.state.mapOptions.center);
                    let map: google.maps.Map = this._map;
                    fetch('/api/stops/find-near?latOrig='+latOrig+'&lngOrig='+lngOrig).then((response: any) => {
                        return response.json();
                    }).then(function(responseJson){
                        map.data.addGeoJson(responseJson[0]);
                    });
                }
            );
    }
}
