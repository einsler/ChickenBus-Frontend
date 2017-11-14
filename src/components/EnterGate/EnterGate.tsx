import * as React from 'react';
import {
    IEnterGate,
    IEnterGateProps,
    IEnterGateStyles
} from './EnterGate.Props';
import { BaseComponent, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { GoogleMap } from "../GoogleMap/index";
import { getStyles } from './EnterGate.styles'
import { PlaceAutocomplete } from "../PlaceAutocomplete/index";
import { supportedCountries } from "../../MockData/FrontEndConsts";
import { IRouteInfoProps } from "../RouteInfo/index";

const styles = getStyles();

interface IEnterGateState {
  route: PlaceAutocomplete[];
  times?: string[];
  routeProperties: IRouteInfoProps;
}

export class EnterGate extends BaseComponent<IEnterGateProps, IEnterGateState> {
    private _tripDuration: TextField;
    private _pickUpTime: TextField;
    private _cost: TextField;
    private _notes: TextField;
    private _times: HTMLUListElement;
    private _stopCount: number;
    
    constructor(props: IEnterGateProps) {
        super(props);
        this._stopCount= 0;
        this.state = {
            times: [],
            route: [new PlaceAutocomplete({title: "Origin"})],
            routeProperties: undefined
        }
    }

    @autobind
    private addTime():void{
      if (this._pickUpTime.value == null || this.state.times.indexOf(this._pickUpTime.value) == 0){

      }
      else if (this._pickUpTime.value != null && this.state.times.indexOf(this._pickUpTime.value) < 0){
        let li: HTMLLIElement = document.createElement("li");
        li.appendChild(document.createTextNode(this._pickUpTime.value))
        this._times.appendChild(li)
        this.setState({
          times: this.state.times.concat(this._pickUpTime.value),
          routeProperties: undefined
        })
      }
    }

    @autobind
    private removeTime(): void {
        if (this._pickUpTime.value != null){
            this._times.removeChild(this._times.lastChild)
            this.setState({
              times: this.state.times.slice(0, this.state.times.length-1),
              routeProperties: undefined
            })
          }
    }

    @autobind
    private addStop(): void{
        this._stopCount++;
        let temp: PlaceAutocomplete[] = this.state.route;
        temp.push(new PlaceAutocomplete({title: "Stop "+ this._stopCount}));
        this.setState({
            route: temp,
            routeProperties: undefined
        })
    }

    @autobind
    private removeStop(): void {
        if(this.state.route.length > 1) {
            this._stopCount--;
            let temp: PlaceAutocomplete[] = this.state.route.slice(0,this.state.route.length-1);
            this.setState({
                route: temp,
                routeProperties: undefined
            });
        }
    }

    @autobind
    private generateStops(storeRoute: boolean) {
            let hasGoodLocationData: boolean = true;
            let invalidInputs: string = '';
            this.state.route.forEach((p, index) => {
                if(!p.getPlace()) {
                    hasGoodLocationData = false;
                    invalidInputs += p.props.title + ' ';
                    return;
                }
            });
            if(hasGoodLocationData && this.state.route.length > 1) {
                console.log("ran")
                this.setState({
                    routeProperties: storeRoute ? {
                        name: this.state.route[0].getPlace().name+'-'+this.state.route[this.state.route.length-1].getPlace().name,
                        cost: new Number(this._cost.value).valueOf(),
                        duration: new Number(this._tripDuration.value).valueOf(),
                        notes: this._notes.value
                    }: undefined,
                });
            }else if(this.state.route.length <= 1){
                alert("Only one stop was added! Add more to create a valid route!");
            }else {
                alert("Check your location value for " + invalidInputs);  
            }
        };

    @autobind
    private _addRoute(): void{
        this.generateStops(true);

    }
    @autobind
    private _previewRoute(): void{
        this.generateStops(false);
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={styles.form}>
                    <Label> Stops </Label>
                    {this.state.route.map((val) => val.render())}
                    <div style={styles.enterButtonBox}>
                        <CommandButton iconProps={{iconName: 'Add'}} text={ "Add Stop" } onClick={this.addStop}/>
                        <CommandButton iconProps={{iconName: 'SkypeMinus'}} text={ "Remove Stop" } onClick={this.removeStop}/>
                    </div>
                    <div style={styles.times}>
                        <div style={styles.flex}>
                            <div style={styles.label}>
                                <Label> Trip Duration</Label>
                            </div>
                            <div style={styles.input}>
                                <TextField componentRef = {this._resolveRef('_tripDuration')} placeholder= 'Enter duration in minutes'/>
                            </div>
                        </div>
                    </div>
                    <div style={styles.flex}>
                        <div style={styles.label}>
                            <Label>Cost</Label>
                        </div>
                        <div style={styles.input}>
                            <TextField componentRef = {this._resolveRef('_cost')} placeholder= 'Enter cost in dollars'/>
                        </div>
                    </div>
                    <TextField componentRef = {this._resolveRef('_notes')} label='Notes' multiline rows={ 5 }/>
                    <div style={ styles.enterButtonBox }>
                        <CommandButton text='Preview Route' onClick={this._previewRoute}/>
                        <CommandButton text='Add Route' onClick={this._addRoute}/>
                    </div>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap locationCoords={ this.state.route.map((place)=>place.getCoords()) } routeProperties={ this.state.routeProperties }/>
                </div>
            </div>
        )
    }
}

/**
 *                         <div style={styles.flex}>
                            <div style={styles.label}>
                                <Label>Pick-Up Time</Label>
                            </div>
                            <div style={styles.input}>
                                <TextField componentRef = {this._resolveRef('_pickUpTime')} placeholder= '13:00'/>
                            </div>
                        </div>
                        <div style={ styles.enterButtonBox }>
                            <CommandButton text='Add Pickup Time' onClick={this.addTime}/>
                            <CommandButton text='Remove Pickup Time' onClick={this.removeTime}/>
                        </div>
                        <ul ref={(times) => this._times = times}>

                        </ul>
 */