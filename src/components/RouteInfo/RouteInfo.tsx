import {
    IRouteInfo,
    IRouteInfoProps,
    IRouteInfoStyles
} from './RouteInfo.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { getStyles } from "./RouteInfo.styles";
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/components/Pivot';

interface IRouteInfoState {
    content?: JSX.Element;
}

const styles = getStyles();

export class RouteInfo extends BaseComponent<IRouteInfoProps, IRouteInfoState> {
    constructor(props: IRouteInfoProps) {
        super(props);
        this.state = {
            content: this.renderTimes(props.departureTimes.monday)
        }
    }

    public render() {
        return(
            <div style={styles.root}>
                <div style={styles.infoContainer}>
                    <h4 style={styles.title}> Route </h4>
                    <p> { this.props.name } </p>
                </div>
                <div style={styles.infoContainer}>
                    <h4 style={styles.title} > Duration </h4>
                    <p> { this.props.duration } Minutes </p>
                </div>
                <div style={styles.infoContainer}>
                    <h4 style={styles.title}> Cost </h4>
                    <p> c${ this.props.cost } </p>
                </div>
                <div style={{...styles.infoContainer, height: '50px'}}>
                    <h4 style={styles.title}> Notes </h4>
                    <p style={{overflow: 'auto', maxHeight: '50px',maxWidth: '250px'}}> { this.props.notes } </p>
                </div>
                <h4 style={{...styles.title, height: '25px', marginTop: '5', marginBottom: '0'}}> Departure Times </h4>
                <div style={styles.infoContainer}>
                    <Pivot linkSize={ PivotLinkSize.normal } linkFormat={ PivotLinkFormat.tabs } onLinkClick = {this.onLinkClick}>
                        <PivotItem linkText='Mon'/>
                        <PivotItem linkText='Tue'/>
                        <PivotItem linkText='Wed'/>
                        <PivotItem linkText='Thur'/>
                        <PivotItem linkText='Fri'/>
                        <PivotItem linkText='Sat'/>
                        <PivotItem linkText='Sun'/>
                    </Pivot>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {this.state.content}
                </div>
            </div>
        )
    }

        /**
     * Function called on pivot link clicked. Used to change the content
     * @param itemKey pivot item clicked
     */
    @autobind
    private onLinkClick(itemKey: PivotItem): void {
        let content: JSX.Element;
        switch(itemKey.props.linkText){
          case 'Mon':
            content = this.renderTimes(this.props.departureTimes.monday);
            break;
          case 'Tue':
            content = this.renderTimes(this.props.departureTimes.tuesday);
            break;
          case 'Wed':
            content = this.renderTimes(this.props.departureTimes.wednesday);
            break;
          case 'Thur':
            content = this.renderTimes(this.props.departureTimes.thursday);
            break;
          case 'Fri':
            content = this.renderTimes(this.props.departureTimes.friday);
            break;
          case 'Sat':
            content = this.renderTimes(this.props.departureTimes.saturday);
            break;
          case 'Sun':
            content = this.renderTimes(this.props.departureTimes.sunday);
            break;
        }
        this.setState({content: content})
    }

    private renderTimes(times: String[]): JSX.Element {
        let t1 = times[0].split(",").slice(0, times[0].split(",").length/3);
        let t2 = times[0].split(",").slice(times[0].split(",").length/3, 2*times[0].split(",").length/3);
        let t3 = times[0].split(",").slice(2*times[0].split(",").length/3, times[0].split(",").length);
        return(
            <div style={styles.timeContainer}>
                <div style={{margin: '10px'}}>
                    {t1.map((time)=><p>{time}</p>)}
                </div>
                <div style={{margin: '10px'}}>
                    {t2.map((time)=><p>{time}</p>)}
                </div>
                <div style={{margin: '10px'}}>
                    {t3.map((time)=><p>{time}</p>)}
                </div>
            </div>
        )
    }

    public componentWillReceiveProps() {
        this.forceUpdate();
    }
}
