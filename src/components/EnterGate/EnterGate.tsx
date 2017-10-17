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

const styles = getStyles();

interface IEnterGateState {
  googleURL?: string;
  pickUP?: string;
  dropOFF?: string;
  stops: PlaceAutocomplete[];
}

export class EnterGate extends BaseComponent<IEnterGateProps, IEnterGateState> {
    private _stops: PlaceAutocomplete[];
    constructor(props: IEnterGateProps) {
        super(props);
        this._stops = [];
        this.state = {
            stops: []
        }
    }

    public addTime():void{

    }

    @autobind
    public addStop(): void{
        this._stops.push(new PlaceAutocomplete({title: 'Stop ' + (this.state.stops.length + 1)}));
        this.setState({
            stops: this._stops
        })
    }

    @autobind
    public removeStop(): void {
        if(this.state.stops.length > 0) {
            this._stops.pop();
            this.setState({
                stops: this._stops
            })
        }
    }

    public addRoute(): void {

    }

    public render() {
        console.log("ran")
        return(
          <div style={ styles.root }>
              <div style={styles.form}>
                <Label> Stops </Label>
                <PlaceAutocomplete title='Origin' />
                {this.state.stops.map((item)=>item.render())}
                <div style={styles.enterButtonBox}>
                    <IconButton iconProps={{iconName: 'Add'}} onClick={this.addStop}/>
                    <IconButton iconProps={{iconName: 'SkypeMinus'}} onClick={this.removeStop}/>
                </div>
                <PlaceAutocomplete title='Destination'/>
                <Label> Times </Label>
                <TextField label='Trip Duration' placeholder= '4:00'/>
                <TextField label='Pick-Up Time' placeholder= '13:00'/>
                <div style={ styles.enterButtonBox }>
                  <Button text='Add Pick-Up Time' onClick={this.addTime}/>
                </div>

              <div>
                <TextField label='Cost' placeholder= '$'/>
              </div>
              <div>
                <TextField label='Notes' multiline rows={ 4 }/>
              </div>
              <div style={ styles.enterButtonBox }>
                <Button text='Add Route' onClick={this.addRoute}/>
              </div>
              </div>
              <div style={ styles.googleMap }>
                  <GoogleMap/>
              </div>
          </div>
        )
    }
    @autobind
    public uploadData() {
        this.setState({googleURL: "https://www.google.com/maps/embed/v1/directions" +
            "&pickUP=" + this.state.pickUP +
            "&dropOFF=" + this.state.dropOFF});
            //to API with everything else
    }
    @autobind
    private onPickUpSet(newValue: string) {
        this.setState( {
                pickUP: newValue.replace(', ','+').replace(' ,','+').replace(' ','+').replace(',','+')
            }
        )
    }
    @autobind
    private onDropOffSet(newValue: string) {
        this.setState( {
                dropOFF: newValue.replace(', ','+').replace(' ,','+').replace(' ','+').replace(',','+')
            }
        )
    }
}
