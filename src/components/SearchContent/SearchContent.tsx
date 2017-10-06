import {
    ISearchContent,
    ISearchContentProps,
    ISearchContentStyles
} from './SearchContent.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import{ SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox';
import{ DatePicker } from 'office-ui-fabric-react/lib/components/DatePicker';
import * as React from "react";
import { Button } from "office-ui-fabric-react/lib/components/Button";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { getStyles } from './SearchContent.styles'
import { APIKey, supportedCountries } from '../../MockData/MockFrontEnd'
import { GoogleMap } from "../GoogleMap/index";

const styles = getStyles();

interface ISearchContentState {
    destination?: string,
    origin?: string  
}

export class SearchContent extends BaseComponent<ISearchContentProps, ISearchContentState> {
    private _originAutocomplete: google.maps.places.Autocomplete;
    private _originInput: HTMLInputElement;
    private _destinationAutocomplete: google.maps.places.Autocomplete;
    private _destinationInput: HTMLInputElement;
    private _googleMap: GoogleMap;

    constructor(props: ISearchContentProps) {
        super(props);
        this.state = {}
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.searchPanel }>
                    <Label required={ true }> Origin </Label>
                    <input ref={ (input) => this._originInput = input } style={ styles.locationInput }/>
                    <Label required={ true }> Destination </Label>
                    <input ref={ (input) => this._destinationInput = input } style={ styles.locationInput }/>
                    <Label required={ true }> Depart Date </Label>
                    <DatePicker placeholder='Choose the date to leave' isRequired={ true }/>
                    <Label> Arrive by Date </Label>
                    <DatePicker placeholder='Latest date to arrive'/>
                    <div style={ styles.searchButtonBox }>
                        <Button text='Search' onClick={ this.onRoute }/>
                    </div>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap componentRef={ this._resolveRef("_googleMap") } origin={ this.state.origin } destination={ this.state.destination }/>
                </div>
            </div>
        )
    }

    public componentDidMount() {
        this._originAutocomplete = new google.maps.places.Autocomplete(this._originInput ,{componentRestrictions: { country: supportedCountries[0]}});        
        this._destinationAutocomplete = new google.maps.places.Autocomplete(this._destinationInput ,{componentRestrictions: { country: supportedCountries[0]}});
    }

    @autobind
    public onRoute() {   
        this.setState({
            origin: this._originInput.value,
            destination: this._destinationInput.value
        })
    }
}