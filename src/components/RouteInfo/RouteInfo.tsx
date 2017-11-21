import {
    IRouteInfo,
    IRouteInfoProps,
    IRouteInfoStyles
} from './RouteInfo.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { getStyles } from "./RouteInfo.styles";

interface IRouteInfoState {

}

const styles = getStyles();

export class RouteInfo extends BaseComponent<IRouteInfoProps, IRouteInfoState> {
    constructor(props: IRouteInfoProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
            <div style={styles.root}>
                <div style={styles.infoContainer}>
                    <h4 style={styles.title}> Route </h4>
                    <p style={styles.text}> { this.props.name } </p>
                </div>
                <div style={styles.infoContainer}>
                    <h4 style={styles.title} > Duration </h4>
                    <p> { this.props.duration } Minutes </p>
                </div>
                <div style={styles.infoContainer}>
                    <h4 style={styles.title}> Cost </h4>
                    <p> ${ this.props.cost } </p>
                </div>
                <div style={styles.infoContainer}>
                    <h4 style={styles.title}> Notes </h4>
                    <p> { this.props.notes } </p>
                </div>
            </div>
        )
    }

    public componentWillReceiveProps() {
        this.forceUpdate();
    }
}
