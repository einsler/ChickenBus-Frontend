import {
    IPlaceAutocomplete,
    IPlaceAutocompleteProps,
    IPlaceAutocompleteStyles
} from './PlaceAutocomplete.Props';
import { BaseComponent, autobind, KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { Label } from "office-ui-fabric-react/lib/Label";
import { supportedCountries } from "../../MockData/FrontEndConsts";
import { getStyles } from "./PlaceAutocomplete.styles";

interface IPlaceAutocompleteState {

}

const styles = getStyles();

export class PlaceAutocomplete extends BaseComponent<IPlaceAutocompleteProps, IPlaceAutocompleteState> implements IPlaceAutocomplete{
    private _autocomplete: google.maps.places.Autocomplete;
    private _input: HTMLInputElement;
    
    constructor(props: IPlaceAutocompleteProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={styles.labelContainer}> 
                    <Label> {this.props.title} </Label>
                </div>
                <div style={styles.inputContainer}> 
                    <input ref={ (input) => this._input = input } placeholder="Input Value" style={ styles.input } onKeyPress={ this._onRouteEnter }/>
                </div>
            </div>
        )
    }

    public componentDidMount() {
        this._autocomplete = new google.maps.places.Autocomplete(this._input ,{componentRestrictions: { country: supportedCountries[0]}});                
    }

    @autobind
    public _onRouteEnter(ev: React.KeyboardEvent<HTMLInputElement>) {
        if(ev.which === KeyCodes.enter) {
            event.preventDefault();
            event.stopPropagation();
            this.props.onEnterPressed();
        }
    }

    public getPlace(): google.maps.places.PlaceResult {
        let place = this._autocomplete.getPlace();
        return place ? this._autocomplete.getPlace() : null;
    }
}