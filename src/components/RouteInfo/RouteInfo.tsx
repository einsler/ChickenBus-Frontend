import {
    IRouteInfo,
    IRouteInfoProps,
    IRouteInfoStyles,
} from './RouteInfo.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { getStyles } from "./RouteInfo.styles";
import { Card, Collapsible, CollapsibleItem, Tab, Tabs } from "react-materialize";
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/components/Pivot';

interface IRouteInfoState {
    timeMon?: JSX.Element;
    timeTues?: JSX.Element;
    timeWed?: JSX.Element;
    timeThurs?: JSX.Element;
    timeFri?: JSX.Element;
    timeSat?: JSX.Element;
    timeSun?: JSX.Element;
}

const styles = getStyles();

export class RouteInfo extends BaseComponent<IRouteInfoProps, IRouteInfoState> {
    constructor(props: IRouteInfoProps) {
        super(props);
        this.state = {
            timeMon: this.renderTimes(props.departureTimes.monday),
            timeTues: this.renderTimes(props.departureTimes.tuesday),
            timeWed: this.renderTimes(props.departureTimes.wednesday),
            timeThurs: this.renderTimes(props.departureTimes.thursday),
            timeFri: this.renderTimes(props.departureTimes.friday),
            timeSat: this.renderTimes(props.departureTimes.saturday),
            timeSun: this.renderTimes(props.departureTimes.sunday)
        };
    }

    public render() {
        return(
            <Collapsible>
                <CollapsibleItem header= {
                    <div>
                        <div style={styles.infoContainer}>
                            <p style={styles.name}> { this.props.name } </p>
                            <p style={styles.time}> { this.props.duration } Minutes </p>
                        </div>
                        <div style={styles.infoContainer}>
                            <p style={styles.cost}> C${ this.props.cost } </p>
                        </div>
                    </div>
                }>
                    <Tabs className='tab-demo z-depth-1' style={{width: 'auto', padding: '0px'}}>
                        <Tab title='M' active>
                            <div style={{overflow: 'auto'}}>
                                <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                                    {this.state.timeMon}
                                </div>
                            </div>
                        </Tab>
                        <Tab title='Tu'>
                            <div style={{overflow: 'auto'}}>
                                <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                                    {this.state.timeTues}
                                </div>
                            </div>
                        </Tab>
                        <Tab title='W'>
                            <div style={{overflow: 'auto'}}>
                                <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                                    {this.state.timeWed}
                                </div>
                            </div>
                        </Tab>
                        <Tab title='Th'>
                            <div style={{overflow: 'auto'}}>
                                <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                                    {this.state.timeThurs}
                                </div>
                            </div>
                        </Tab>
                        <Tab title='F'>
                            <div style={{overflow: 'auto'}}>
                                <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                                    {this.state.timeFri}
                                </div>
                            </div>
                        </Tab>
                        <Tab title='Sa'>
                            <div style={{overflow: 'auto'}}>
                                <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                                    {this.state.timeSat}
                                </div>
                            </div>
                        </Tab>
                        <Tab title='Su'>
                            <div style={{overflow: 'auto'}}>
                                <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                                    {this.state.timeSun}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                    <div style={styles.infoContainer}>
                            <p style={styles.notes}> Notes:{ this.props.notes } </p>
                    </div>
                >
                </CollapsibleItem>
            </Collapsible>

                /*{ <div style={styles.infoContainer}>
                    <p style={styles.name}> { this.props.name } </p>
                    <p style={styles.time}> { this.props.duration } Minutes </p>
                </div>
                <div style={styles.infoContainer}>
                    <p style={styles.cost}> C${ this.props.cost } </p>
                </div>
                <div style={{...styles.infoContainer, height: '50px'}}>
                    <p style={styles.title}> Notes </p>
                    <p style={{overflow: 'auto', maxHeight: '50px',maxWidth: '250px'}}> { this.props.notes } </p>
                </div>
                <p style={{...styles.title, height: '25px', marginTop: '5', marginBottom: '0px'}}> Departure Times </p>
                <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                    {this.state.content}
                </div>

                { <div style={{overflow: 'auto'}}>
                        <p style={{...styles.title, height: '15px', marginTop: '5px', marginBottom: '5px'}}> Departure Times </p>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                            {this.state.timeMon}
                        </div>
                    </div> } 
                }*/

                /*{   <div style={styles.infoContainer}>
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
                    }*/

        )
    }

        /**
     * Function called on pivot link clicked. Used to change the content
     * @param itemKey pivot item clicked
     
    @autobind
    private onLinkClick(itemKey: PivotItem): void {
        let content: JSX.Element;
        switch(itemKey.props.linkText) {
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
        this.setState({content: content});
    } */

    private renderTimes(times: String[]): JSX.Element {
        const t1 = times[0].split(',').slice(0, times[0].split(',').length / 3);
        const t2 = times[0].split(',').slice(times[0].split(',').length / 3, 2 * times[0].split(',').length / 3);
        const t3 = times[0].split(',').slice(2 * times[0].split(',').length / 3, times[0].split(',').length);
        return(
            <div style={styles.timeContainer}>
                <div style={{margin: '10px'}}>
                    {t1.map((time) => <p>{time}</p>)}
                </div>
                <div style={{margin: '10px'}}>
                    {t2.map((time) => <p>{time}</p>)}
                </div>
                <div style={{margin: '10px'}}>
                    {t3.map((time) => <p>{time}</p>)}
                </div>
            </div>
        );
    }

    public componentWillReceiveProps() {
        this.forceUpdate();
    }
}
