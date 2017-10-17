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
import { Button } from 'office-ui-fabric-react/lib/Button';
import { GoogleMap } from "../GoogleMap/index";
import { getStyles } from './EnterGate.styles'

const styles = getStyles();

interface IEnterGateState {
  googleURL?: string;
  pickUP?: string;
  dropOFF?: string;
  times?: TextField[];
}

export class EnterGate extends BaseComponent<IEnterGateProps, IEnterGateState> {
  private _tripDuration: TextField;
          _pickUpTime: TextField;
          _cost: TextField;
          _notes: TextField;
    constructor(props: IEnterGateProps) {
        super(props);
        this.state = {
          times: []
        }
    }

    @autobind
    public addTime():void{
      if (this._pickUpTime != null){
        this.setState({
          times: this.state.times.concat(this._pickUpTime)
        })
      }
    }

    @autobind
    public removeTime(): void{
      if(this.state.times.length > 0) {
        this.setState({
          times: this.state.times.slice(0, this.state.times.length-1)
        })
      }

    }

    @autobind
    public addRoute(): void{
      
    }

    public render() {
        return(
          <div style={ styles.root }>
              <div style={styles.form}>
                <div style={styles.times}>
                  <div style={styles.flex}>
                    <Label> Trip Duration:   </Label>
                    <TextField componentRef = {this._resolveRef('_tripDuration')} placeholder= '90 minutes'/>
                  </div>
                  <div style={styles.flex}>
                    <Label> Pick-Up Time:   </Label>
                    <TextField componentRef = {this._resolveRef('_pickUpTime')} placeholder= '13:00'/>
                  </div>
                  <div style={ styles.enterButtonBox }>
                    <Button text='Add Pickup Time' onClick={this.addTime}/>
                    <Button text='Remove Pickup Time' onClick={this.removeTime}/>
                  </div>
                </div>
                <div style={styles.flex}>
                  <Label> Cost:   </Label>
                  <TextField componentRef = {this._resolveRef('_cost')} placeholder= '$'/>
                </div>
                <TextField componentRef = {this._resolveRef('_notes')} label='Notes' multiline rows={ 5 }/>
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
