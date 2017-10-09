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
}

export class EnterGate extends BaseComponent<IEnterGateProps, IEnterGateState> {
    constructor(props: IEnterGateProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
          <div style={ styles.root }>
              <div style={ styles.entryPanel }>
                  <TextField required = {true} placeholder = 'Origin Country' />
                  <TextField required = {true} placeholder = 'Origin City' />
                  <TextField placeholder = 'Pick-Up Address' />
                  <Label required={ true }> Pick-Up Location </Label>
                  <SearchBox onChange={this.onPickUpSet} style={{ width: '30%', float: 'left'}} />

                  <TextField placeholder = 'Pick-Up Location Notes' />

                  <TextField required = {true} placeholder = 'Destination Country' />
                  <TextField required = {true} placeholder = 'Destination City' />
                  <TextField placeholder = 'Drop-Off Address' />
                  <Label required={ true }> Drop-Off Location </Label>
                  <SearchBox onChange={this.onDropOffSet} />

                  <TextField required = {true} placeholder = 'Departure Time' />
                  <TextField placeholder = 'Estimated Travel Duration' />
                  <TextField required = {true} placeholder = 'Estimated Arrival Time' />
                  <TextField placeholder = 'Mode of Transportation' />
                  <TextField placeholder = 'Type of Service' />
                  <TextField placeholder = 'Make/Model' />
                  <div style={ styles.enterButtonBox }>
                      <Button text='Enter' onClick={this.uploadData}/>
                  </div>
              </div>
              <div style={ styles.googleMap }>
                  <GoogleMap />
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
