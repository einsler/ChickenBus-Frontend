import {
    IGoogleMap,
    IGoogleMapProps,
    IGoogleMapStyles
} from './GoogleMap.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { MapContainer } from './GoogleMapJS';

interface IGoogleMapState {

}

export class GoogleMap extends BaseComponent<IGoogleMapProps, IGoogleMapState> {
    constructor(props: IGoogleMapProps) {
        super(props);
    }

    public render() {
        return(
            <div></div>
        )
    }
}