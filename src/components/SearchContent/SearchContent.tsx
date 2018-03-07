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
import { Button, Input, footer, Icons} from 'react-materialize';
import AdSense from 'react-adsense';

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

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;

        document.body.appendChild(script);
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div className="teal lighten-5" style={ styles.searchPanel }>
                    <div className="white z-depth-1" style={styles.searchBox}>
                        <PlaceAutocomplete componentRef={ this._resolveRef("_originAutocomplete")} title='Origin' onEnterPressed={ this._onRoute } />
                        <PlaceAutocomplete componentRef={ this._resolveRef("_destinationAutocomplete")} title='Destination' onEnterPressed={ this._onRoute } />
                        <div style={ styles.searchButtonBox }>
                            <Button className="amber darken-2" onClick={ this._onRoute }>Search</Button>
                        </div>
                        <div style={{height: '70%', overflowY: 'auto'}}>
                            { this.state.routeInfo ? <Label> Displaying {this.state.routeInfo.length} route(s)</Label> : null}
                            { this.state.routeInfo ? this.state.routeInfo.map((info)=><RouteInfo {...info}/>): null }
                        </div>
                    </div>
                    <div>
                      <div className="container">
                        <p className="orange-text text-darken-1" style={styles.adspace}> ----------------------ADSPACE----------------------</p>
                        <AdSense.Google client='ca-pub-2730168194482941'
                                      //slot='7806394673'
                                      style={{width: '100%', height: '300px', float: 'left'}}
                                      format='' />
                      </div>
                    </div>
                    <footer className="page-footer blue-grey" style={styles.footer}>
                      <div className="container">
                        <div className="row">
                          <div className="col l6">
                            <p className="grey-text text-lighten-4">With ChickenBus you will be able to see more of the world, with less of the hassle, and at the prices that locals pay.</p>
                          </div>
                          <div className="col l2">
                            <ul>
                              <li><h6>About</h6></li>
                              <li><a href="" className="grey-text text-lighten-3">FAQ</a></li>
                              <li><a href="" className="grey-text text-lighten-3">Facebook</a></li>
                              <li><a href="http://www.twitter.com/ChickenBusCo" className="grey-text text-lighten-3">Twitter</a></li>
                              <li><a href="" className="grey-text text-lighten-3">GoFundMe</a></li>
                              <li><a href="" className="grey-text text-lighten-3">Affiliates</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className= 'container'>
                      <div className = "row">
                        <a style={styles.icon} href="http://www.twitter.com/ChickenBusCo" className="icon-block col s3">
                          <i className="small material-icons amber-text text-darken-2">people</i>
                        </a>
                        <a style={styles.icon} href="https://www.gofundme.com" className="icon-block col s3">
                          <i className="small material-icons amber-text text-darken-2">cake</i>
                        </a>
                        <a style={styles.icon} href="https://www.facebook.com" className="icon-block col s3">
                          <i className="small material-icons amber-text text-darken-2">monetization_on</i>
                        </a>
                      </div>
                      </div>
                      <div className="footer-copyright">
                        <div className="container">Made by <a href="https://chickenbus.co/">ChickenBusLLC </a></div>
                      </div>
                    </footer>
                </div>
                <div style={ styles.googleMap } className="z-depth-0">
                    <GoogleMap locationCoords={ this.state.originDestination } findRoute={ true } onDidRenderNewLocations={ this._onMapDidRenderNewLocations } />
                </div>
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
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
