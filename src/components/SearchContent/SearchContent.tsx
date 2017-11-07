import {
    ISearchContent,
    ISearchContentProps,
    ISearchContentStyles
} from './SearchContent.Props';
import { BaseComponent, autobind, KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import{ SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox';
import{ DatePicker } from 'office-ui-fabric-react/lib/components/DatePicker';
import * as React from "react";
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { getStyles } from './SearchContent.styles'
import { APIKey, supportedCountries } from '../../MockData/FrontEndConsts'
import { GoogleMap } from "../GoogleMap/index";
import { PlaceAutocomplete } from "../PlaceAutocomplete/index";
import { RouteInfo, IRouteInfoProps } from "../RouteInfo/index";

const styles = getStyles();

interface ISearchContentState {
    originDestination?: PlaceAutocomplete[];
    routeInfo?: IRouteInfoProps[];
}

export class SearchContent extends BaseComponent<ISearchContentProps, ISearchContentState> {
    private _destinationAutocomplete: PlaceAutocomplete;
    private _originAutocomplete: PlaceAutocomplete;

    constructor(props: ISearchContentProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.searchPanel }>
                    <PlaceAutocomplete componentRef={ this._resolveRef("_originAutocomplete")} title='Origin' onEnterPressed={ this._onRoute } />
                    <PlaceAutocomplete componentRef={ this._resolveRef("_destinationAutocomplete")} title='Destination' onEnterPressed={ this._onRoute } />
                    <div style={ styles.searchButtonBox }>
                        <CommandButton text='Search' onClick={ this._onRoute }/>
                    </div>
                    <div>
                        { this.state.routeInfo ? <h3> Displaying {this.state.routeInfo.length} route(s)</h3> : null}
                        { this.state.routeInfo ? <RouteInfo {...this.state.routeInfo[0]}/>: null }
                    </div>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap locationAutocompletes={ this.state.originDestination } findRoute={ true } onDidRenderNewLocations={ this._onMapDidRenderNewLocations } />
                </div>
            </div>
        )
    }

    /**
     * Callback for when the search button is executed. The function will first  check to see if the autocompletes will return
     * a valid location. If input is valid, then change the state to trigger a rerender.
     */
    @autobind
    private _onRoute() {
        if(!this._originAutocomplete.getPlace()) {
            alert("Enter a valid origin");
        }
        else if(!this._destinationAutocomplete.getPlace()) {
            alert("Enter a valid destination");
        }
        else {
            this.setState({
                originDestination: [this._originAutocomplete, this._destinationAutocomplete],
            });
        }
    }

    @autobind
    private _onMapDidRenderNewLocations(routes?: any[]) {
        if(routes) {
            let routeInfo = routes.map((route)=>route.properties);
            console.log(routeInfo)
            this.setState({
                routeInfo: routeInfo,
                originDestination: []       
            })
        }else {
            this.setState({
                routeInfo: undefined,
                originDestination: []       
            })
        }
    }
}
