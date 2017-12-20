import {
    ISearchContent,
    ISearchContentProps,
    ISearchContentStyles
} from './SearchContent.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { getStyles } from './SearchContent.styles'
import { APIKey, supportedCountries } from '../../MockData/FrontEndConsts'
import { GoogleMap } from "../GoogleMap/index";
import { PlaceAutocomplete } from "../PlaceAutocomplete/index";
import { RouteInfo, IRouteInfoProps } from "../RouteInfo/index";
import { Button, Input} from 'react-materialize';

const styles = getStyles();

interface ISearchContentState {
    originDestination?: google.maps.LatLng[];
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
                <div style={ styles.searchPanel } className="z-depth-5">
                    <PlaceAutocomplete componentRef={ this._resolveRef("_originAutocomplete")} title='Origin' onEnterPressed={ this._onRoute } />
                    <PlaceAutocomplete componentRef={ this._resolveRef("_destinationAutocomplete")} title='Destination' onEnterPressed={ this._onRoute } />
                    <div style={ styles.searchButtonBox }>
                        <Button onClick={ this._onRoute }>Search</Button>
                    </div>
                    <div style={{height: '70%', overflowY: 'auto'}}>
                        { this.state.routeInfo ? <h3> Displaying {this.state.routeInfo.length} route(s)</h3> : null}
                        { this.state.routeInfo ? this.state.routeInfo.map((info)=><RouteInfo {...info}/>): null }
                    </div>
                </div>
                <div style={ styles.googleMap } className="z-depth-0">
                    <GoogleMap locationCoords={ this.state.originDestination } findRoute={ true } onDidRenderNewLocations={ this._onMapDidRenderNewLocations } />
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
                originDestination: [this._originAutocomplete.getCoords(), this._destinationAutocomplete.getCoords()],
            });
        }
    }

    @autobind
    private _onMapDidRenderNewLocations(routes?: any) {
        if(routes) {
            let routeInfo = routes.routesInfo.map((routesInfo: any)=>routesInfo.properties);
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
