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
  route: PlaceAutocomplete[];
  times?: string[];
  storeRoute?: boolean;
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
        }
    }

    @autobind
    private addTime():void{
      if (this._pickUpTime.value != null && this.state.times.indexOf(this._pickUpTime.value) < 0){
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
        let temp: PlaceAutocomplete[] = this.state.route;
        temp.push(new PlaceAutocomplete({title: "Stop "+ this._stopCount}));
        this.setState({
            route: temp
        })
    }

    @autobind
    private removeStop(): void {
        if(this.state.route.length > 1) {
            this._stopCount--;
            let temp: PlaceAutocomplete[] = this.state.route.slice(0,this.state.route.length-1);
            this.setState({
                route: temp,
                storeRoute: false                
            });
        }
    }

    @autobind
    private generateStops(storeRoute: boolean, skipCheck?: boolean) {
            let hasGoodLocationData: boolean = true;
            let invalidInputs: string = '';
            this.state.route.forEach((p, index) => {
                if(!p.getPlace()) {
                    hasGoodLocationData = false;
                    invalidInputs += p.props.title + ' ';
                    return;
                }
            });
            if(hasGoodLocationData) {
                this.setState({
                    storeRoute: storeRoute,
                });
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
                        <Button iconProps={{iconName: 'Add'}} text={ "Add Stop" } onClick={this.addStop}/>
                        <Button iconProps={{iconName: 'SkypeMinus'}} text={ "Remove Stop" } onClick={this.removeStop}/>
                    </div>
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