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
import { Button, IconButton } from 'office-ui-fabric-react/lib/Button';
import { GoogleMap } from "../GoogleMap/index";
import { getStyles } from './EnterGate.styles'
import { PlaceAutocomplete } from "../PlaceAutocomplete/index";
import { supportedCountries } from "../../MockData/FrontEndConsts";

const styles = getStyles();

interface IEnterGateState {
  googleURL?: string;
  pickUP?: string;
  dropOFF?: string;
  stops: PlaceAutocomplete[];
  route: PlaceAutocomplete[];
  times?: string[];
  storeRoute?: boolean;
}

export class EnterGate extends BaseComponent<IEnterGateProps, IEnterGateState> {
    private _origin: PlaceAutocomplete;
    private _destination: PlaceAutocomplete;
    private _tripDuration: TextField;
    private _pickUpTime: TextField;
    private _cost: TextField;
    private _notes: TextField;
    private _times: HTMLUListElement;
    private _stopCount: number;
    private _stopElements: JSX.Element[];

    constructor(props: IEnterGateProps) {
        super(props);
        this._stopCount= 0;
        this._stopElements = [];
        this.state = {
            stops: [],
            times: [],
            route: [],
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
          times: this.state.times.concat(this._pickUpTime.value)
        })
      }
    }

    @autobind
    private removeTime(): void {
        if (this._pickUpTime.value != null){
            this._times.removeChild(this._times.lastChild)
            this.setState({
              times: this.state.times.slice(0, this.state.times.length-1)
            })
          }
    }

    @autobind
    private addStop(): void{
        this._stopCount++;
        this._stopElements = [];
        let temp: PlaceAutocomplete[] = this.state.stops;
        temp.push(new PlaceAutocomplete({title: "Stop "+ this._stopCount}));
        let ref: PlaceAutocomplete[] = [];
        temp.forEach((item, index)=>this._stopElements.push(<PlaceAutocomplete ref={(ph)=>ref.push(ph)} {...item.props}/>));
        this.setState({
            stops: ref
        })
    }

    @autobind
    private removeStop(): void {
        if(this.state.stops.length > 0) {
            this._stopCount--;
            this._stopElements = [];
            let temp: PlaceAutocomplete[] = this.state.stops.slice(0,this._stopCount);
            let ref: PlaceAutocomplete[] = [];
            temp.forEach((item, index)=>this._stopElements.push(<PlaceAutocomplete ref={(ph)=>ref.push(ph)} {...item.props}/>));
            this.setState({
                stops: ref,
                storeRoute: false
            });
        }
    }

    @autobind
    private generateStops(storeRoute: boolean, skipCheck?: boolean) {
            let route: PlaceAutocomplete[] = [this._origin].concat(this.state.stops.concat(this._destination))
            let hasGoodLocationData: boolean = true;
            route.forEach((p, index) => {
                if(!p.getPlace()) {
                    alert("Check your location value for " + p.props.title);
                    hasGoodLocationData = false;
                    return;
                }
            });
            if(hasGoodLocationData) {
                this.setState({
                    route: route,
                    storeRoute: storeRoute,
                });
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
                    <PlaceAutocomplete componentRef={this._resolveRef("_origin")} title='Origin' />
                    {this._stopElements}
                    <div style={styles.flex}>
                    <div style={styles.label}>
                      <p> Add/Subtract Medial Stop </p>
                    </div>
                    <div style={styles.enterButtonBox}>
                          <IconButton iconProps={{iconName: 'Add'}} frameBorder = 'Intermediate Stops' onClick={this.addStop}/>
                          <IconButton iconProps={{iconName: 'SkypeMinus'}} onClick={this.removeStop}/>
                    </div>
                    </div>
                    <PlaceAutocomplete componentRef={this._resolveRef("_destination")} title='Destination'/>
                    <div style={styles.times}>
                        <div style={styles.flex}>
                            <div style={styles.label}>
                                <Label> Trip Duration</Label>
                            </div>
                            <div style={styles.input}>
                                <TextField componentRef = {this._resolveRef('_tripDuration')} placeholder= '90 minutes'/>
                            </div>
                        </div>
                        <div style={styles.flex}>
                            <div style={styles.label}>
                                <Label>Pick-Up Time</Label>
                            </div>
                            <div style={styles.input}>
                                <TextField componentRef = {this._resolveRef('_pickUpTime')} placeholder= '13:00'/>
                            </div>
                        </div>
                        <div style={ styles.enterButtonBox }>
                            <Button text='Add Pickup Time' onClick={this.addTime}/>
                            <Button text='Remove Pickup Time' onClick={this.removeTime}/>
                        </div>
                        <ul ref={(times) => this._times = times}>

                        </ul>
                    </div>
                    <div style={styles.flex}>
                        <div style={styles.label}>
                            <Label>Cost</Label>
                        </div>
                        <div style={styles.input}>
                            <TextField componentRef = {this._resolveRef('_cost')} placeholder= '$'/>
                        </div>
                    </div>
                    <TextField componentRef = {this._resolveRef('_notes')} label='Notes' multiline rows={ 5 }/>
                    <div style={ styles.enterButtonBox }>
                        <Button text='Preview Route' onClick={this._previewRoute}/>
                        <Button text='Add Route' onClick={this._addRoute}/>
                    </div>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap locationAutocompletes={ this.state.route } storeRoute={ this.state.storeRoute }/>
                </div>
            </div>
        )
    }
}
