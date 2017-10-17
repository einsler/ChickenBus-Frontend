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
            <div>
                <Label required={ true }> {this.props.title} </Label>
                <input ref={ (input) => this._input = input } style={ styles.input } onKeyPress={ this._onRouteEnter }/>
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

    public getPlace(): string {
        let place = this._autocomplete.getPlace();
        return place ? this._autocomplete.getPlace().formatted_address : null;
    }
}