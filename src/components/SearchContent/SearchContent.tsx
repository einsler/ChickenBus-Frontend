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
import { Button, Input, footer, Icons, Collapsible} from 'react-materialize';
import AdSense from 'react-adsense';


const styles = getStyles();

const emblem = require('../../images/emblem.png');
var Img = <img style={styles.emblem} src={emblem} />

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
                <div className="blue-grey" style={ styles.searchPanel }>
                    <div className="white z-depth-1" style={styles.searchBox}>
                        <PlaceAutocomplete componentRef={ this._resolveRef("_originAutocomplete")} title='Origin' onEnterPressed={ this._onRoute } />
                        <PlaceAutocomplete componentRef={ this._resolveRef("_destinationAutocomplete")} title='Destination' onEnterPressed={ this._onRoute } />
                        <div style={ styles.searchButtonBox }>
                            <Button className="amber darken-2" onClick={ this._onRoute }>Search</Button>
                        </div>
                        <div style={{height: '70%', overflowY: 'auto'}}>
                            { this.state.routeInfo ? <Label> Displaying {this.state.routeInfo.length} trip(s)</Label> : null}
                            { this.state.routeInfo ? this.state.routeInfo.map((info)=><RouteInfo {...info}/>): null }
                        </div>
                      <div>
                      <ul className="collapsible">
                      <li>
                        <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">description</i>About Us</div>
                        <div className="collapsible-body"><span>ChickenBus gives you the opportunity to have the information needed to comfortably travel in developing countries that is otherwise difficult to discover.</span></div>
                      </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">directions_bus</i>How it Works</div>
                         <div className="collapsible-body"><span>Just enter an origin and destination and we'll help you find a route. If we can't find anything, most likely, we are still trying to collect that data.</span></div>
                       </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">map</i>Want to Help?</div>
                         <div className="collapsible-body"><span>If you have access to transportation data and want to make it available to the public, consider creating an account in order to upload route data. Have a lot of data? We'd love to talk...</span></div>
                       </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">email</i>Contact</div>
                         <div className="collapsible-body"><span>Want to help? Have Questions? Feel free to contact us at ridethechickenbus@gmail.com</span></div>
                       </li>
                      </ul>
                      </div>
                    </div>
                    <footer className="page-footer blue-grey" style={styles.footer}>
                      <div className="container">
                        <div className="row">
                          <div className="col s6">
                            <p>With ChickenBus you will be able to see more of the world, with less of the hassle, and at the prices that locals pay.</p>
                          </div>
                          <div className="col l2">
                            <ul>
                              <li><h6 className="amber-text text-darken-2">Links</h6></li>
                              <li><a href="https://chickenbus.co/" className="grey-text text-lighten-2">Home Page</a></li>
                              <li><a href="https://www.facebook.com/ChickenBus.co" className="grey-text text-lighten-2">Facebook</a></li>
                              <li><a href="http://www.twitter.com/ChickenBusCo" className="grey-text text-lighten-2">Twitter</a></li>
                              <li><a href="https://www.linkedin.com/company/28149593/" className="grey-text text-lighten-2">LinkedIn</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className= 'container'>
                        <div className= 'container'>
                          <div className = "row">
                            <a style={styles.icon} href="http://www.twitter.com/ChickenBusCo" className="icon-block col s4">
                              <i className="small material-icons amber-text text-darken-2">people</i>
                            </a>
                            <a style={styles.icon} href="https://www.gofundme.com" className="icon-block col s4">
                              <i className="small material-icons amber-text text-darken-2">cake</i>
                            </a>
                            <a style={styles.icon} href="https://www.facebook.com" className="icon-block col s4">
                              <i className="small material-icons amber-text text-darken-2">monetization_on</i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="footer-copyright">
                        <div className="container grey-text text-lighten-2">Made by <a className=" amber-text text-darken-2"href="https://chickenbus.co/">ChickenBusLLC </a></div>
                      </div>
                    </footer>
                    <div>
                      <div className="container">
                        <AdSense.Google client='ca-pub-2730168194482941'
                                      //slot='7806394673'
                                      style={{width: '100%', height: '200px', float: 'left'}}
                                      format='' />
                      </div>
                    </div>
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
