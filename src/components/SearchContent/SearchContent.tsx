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
    origin?: string;
    destination?: string;
}

export class SearchContent extends BaseComponent<ISearchContentProps, ISearchContentState> {
    private _geocoder: google.maps.Geocoder;
    private _origin: string;
    private _destination: string;

    constructor(props: ISearchContentProps) {
        super(props);
        this._geocoder = new google.maps.Geocoder();
        this.state = {
            origin: undefined,
            destination: undefined
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.searchPanel }>
                    <Label required={ true }> Origin </Label>
                    <SearchBox onChange={this.onOriginChange} style={{ width: '30%', float: 'left'}} labelText='Enter Origin' />
                    <Label required={ true }> Destination </Label>
                    <SearchBox onChange={this.onDestinationChange} labelText='Enter Destination' />
                    <Label required={ true }> Depart Date </Label>
                    <DatePicker placeholder='Choose the date to leave' isRequired={ true }/>
                    <Label> Arrive by Date </Label>
                    <DatePicker placeholder='Latest date to arrive' />
                    <div style={ styles.searchButtonBox }>
                        <Button text='Search' onClick={ this.onRoute}/>
                    </div>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap origin={ this.state.origin } destination={ this.state.destination } />
                </div>
            </div>
        )
    }

    @autobind
    public onRoute() {
        let request: google.maps.GeocoderRequest = {
            address: this.state.origin,
            componentRestrictions: { country: supportedCountries[0] },
        }
        this._geocoder.geocode(request, 
            (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => 
                { 
                    this.setState({
                        origin: this._origin,
                        destination: this._destination,
                    });
                });
    }

    @autobind
    private onOriginChange(newValue: string) {
        this._origin = newValue;  
    }

    @autobind
    private onDestinationChange(newValue: string) {
        this._destination = newValue;
    }
}