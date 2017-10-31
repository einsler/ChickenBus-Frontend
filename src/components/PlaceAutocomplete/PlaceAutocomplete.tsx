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
import { DetailedReactHTMLElement, InputHTMLAttributes } from "react";

interface IPlaceAutocompleteState {

}

const styles = getStyles();

export class PlaceAutocomplete extends BaseComponent<IPlaceAutocompleteProps, IPlaceAutocompleteState> implements IPlaceAutocomplete{
    private _autocomplete: google.maps.places.Autocomplete;
    private _input: DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    
    constructor(props: IPlaceAutocompleteProps) {
        super(props);
        // Initialize input element now since we need a ref to it to for the google autocompete
        this._input = React.createElement('input', {ref: (input) => this._autocomplete = new google.maps.places.Autocomplete(input ,{componentRestrictions: { country: supportedCountries[0]}}),
                                                    placeholder:"Input Value",
                                                    style: styles.input, 
                                                    onKeyPress: this._onRouteEnter});
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
                    { this._input }
                </div>
            </div>
        )
    }

    /**
     * Method controlling what happens when enter is pressed while focusing on the input element.
     */
    @autobind
    public _onRouteEnter(ev: React.KeyboardEvent<HTMLInputElement>) {
        if(ev.which === KeyCodes.enter) {
            event.preventDefault();
            event.stopPropagation();
            this.props.onEnterPressed();
        }
    }

    /**
     * Public method called to return this component's autocomplete result.
     */
    public getPlace(): google.maps.places.PlaceResult {
        return this._autocomplete.getPlace();
    }
}