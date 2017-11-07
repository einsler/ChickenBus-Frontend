import {
    IRouteInfo,
    IRouteInfoProps,
    IRouteInfoStyles
} from './RouteInfo.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

interface IRouteInfoState {

}

export class RouteInfo extends BaseComponent<IRouteInfoProps, IRouteInfoState> {
    constructor(props: IRouteInfoProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
            <div>
                <h4> Route </h4>
                <p> { this.props.name } </p>
                <h4> Duration </h4>
                <p> { this.props.duration } Minutes </p>
                <h4> Cost </h4>
                <p> ${ this.props.cost } </p>
                <h4> Notes </h4>
                <p> { this.props.notes } </p>
            </div>
        )
    }
}