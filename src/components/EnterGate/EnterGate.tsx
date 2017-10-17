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
  times?: string[];
}

export class EnterGate extends BaseComponent<IEnterGateProps, IEnterGateState> {
    private _stops: PlaceAutocomplete[];
    private _origin: PlaceAutocomplete;
    private _destination: PlaceAutocomplete;
    private _tripDuration: TextField;
    private _pickUpTime: TextField;
    private _cost: TextField;
    private _notes: TextField;
    private _times: HTMLUListElement;
    constructor(props: IEnterGateProps) {
        super(props);
        this._stops = [];
        this.state = {
            stops: [],
            times: []
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
        this._stops.push(new PlaceAutocomplete({title: 'Stop ' + (this.state.stops.length + 1)}));
        this.setState({
            stops: this._stops
        })
    }

    @autobind
    private removeStop(): void {
        if(this.state.stops.length > 0) {
            this._stops.pop();
            this.setState({
                stops: this._stops
            })
        }
    }

    @autobind
    private  generateStops() {
            let geoCoder = new google.maps.Geocoder();
            let stopRequest: google.maps.GeocoderRequest;
            let stops: any = []
            let autoCompletes: PlaceAutocomplete[] = [this._origin].concat(this.state.stops.concat(this._destination))
            let counter = 0;
            autoCompletes.forEach((p, index) => {
                if(!p.getPlace()) return null
                stopRequest = {
                    address: p.getPlace().formatted_address,
                    componentRestrictions: { country: supportedCountries[0] },
                }
                geoCoder.geocode(stopRequest, (result)=>{
                    console.log(result);
                    stops.push({"coordinates": [result[0].geometry.location.lng, result[0].geometry.location.lat]})
                    counter++;
                    if(counter === autoCompletes.length){
                        this.addRoute(stops);
                    }
                });
            });
        };


    @autobind
    private addRoute(stops: any[]): void{
        let route = {
            "stops" : stops,
            "name": this._origin.getPlace().name + '-' + this._destination.getPlace().name,
            "cost": 0,
            "times": [-1],
            "duration": 72,
            "notes": "blach blah blach"
        }
        console.log(JSON.stringify(route))
      fetch('/api/routes/create', {
          method: 'post',
          body: JSON.stringify(route)
      }).then((res)=> res.json())
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={styles.form}>
                    <Label> Stops </Label>
                    <PlaceAutocomplete componentRef={this._resolveRef("_origin")} title='Origin' />
                    {this.state.stops.map((item)=>item.render())}
                    <div style={styles.enterButtonBox}>
                        <IconButton iconProps={{iconName: 'Add'}} onClick={this.addStop}/>
                        <IconButton iconProps={{iconName: 'SkypeMinus'}} onClick={this.removeStop}/>
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
                        <Button text='Add Route' onClick={this.generateStops}/>
                    </div>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap/>
                </div>
            </div>
        )
    }
}
