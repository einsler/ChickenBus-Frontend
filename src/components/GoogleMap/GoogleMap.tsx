import {
    IGoogleMap,
    IGoogleMapProps,
    IGoogleMapStyles
} from './GoogleMap.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
// import { Promise } form
import * as React from "react";
import { MapContainer } from './GoogleMapJS';
import { getStyles } from './GoogleMap.styles'

interface IGoogleMapState {
    mapCanvas: HTMLDivElement;
}
const styles: IGoogleMapStyles = getStyles();

export class GoogleMap extends BaseComponent<IGoogleMapProps, IGoogleMapState> {
    private _map: google.maps.Map;
    private _mapOptions: google.maps.MapOptions;
    private _mapCanvas: HTMLDivElement;

    constructor(props: IGoogleMapProps) {
        super(props);

        this._mapOptions = {
            center: new google.maps.LatLng(51.508742,-0.120850),
            zoom: 5
        }
    }

    public render() {
        return(
            <div ref={ this._resolveRef("_mapCanvas")} style={ styles.root } id="map"></div>
        )
    }

    @autobind
    public componentDidMount() {
        this._map = new google.maps.Map(this._mapCanvas, this._mapOptions);
        let that = this;
        this.setState({
            mapCanvas: this._mapCanvas
        });
        console.log("ran");
        fetch('/api/test').then((response: any) => {
            return response.json();
        }).then((responseJSON) => {
            that._map.data.addGeoJson(responseJSON[0])
        });
    }
}
