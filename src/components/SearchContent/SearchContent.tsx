//Imports
import * as React from "react";

import AdSense from 'react-adsense';
import {
    ISearchContent,
    ISearchContentProps,
    ISearchContentStyles
} from './SearchContent.Props';
import { getStyles } from './SearchContent.styles'
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { APIKey, supportedCountries } from '../../MockData/FrontEndConsts'
import { GoogleMap } from "../GoogleMap/index";
import { PlaceAutocomplete } from "../PlaceAutocomplete/index";
import { RouteInfo, IRouteInfoProps } from "../RouteInfo/index";
import { Button, Input, footer, Icons, Collapsible} from 'react-materialize';
import { SocialIcon } from 'react-social-icons';

const styles = getStyles();
const emblem = require('../../images/emblem.png');
const tour = require('../../images/nicaragua.jpg');
const white = require('../../images/circle.png');

var Img = <img style={styles.emblem} src={emblem} />
var Nic = <img style={styles.tour} src={tour} />
var circle = <img style={styles.white} src={white} />

var urls = [
  'http://chickenbus.co',
  'http://facebook.com/ChickenBus.co',
  'http://www.twitter.com/ChickenBusCo',
  'https://www.linkedin.com/company/28149593/',
];

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
                <div className="" style={ styles.searchPanel }>
                    <div className="white" style={{marginBottom: '-6px'}}>
                      <div style={styles.searchBox}>

                        <PlaceAutocomplete componentRef={ this._resolveRef("_originAutocomplete")} title='Origin' onEnterPressed={ this._onRoute } />
                        <PlaceAutocomplete componentRef={ this._resolveRef("_destinationAutocomplete")} title='Destination' onEnterPressed={ this._onRoute } />

                        <div style={ styles.searchButtonBox }>
                            <Button className="amber darken-2 z-depth-0" onClick={ this._onRoute }>Search</Button>
                        </div>

                        <div style={{height: '70%', overflowY: 'auto'}}>
                            { this.state.routeInfo ? <Label> Displaying {this.state.routeInfo.length} Route(s)</Label> : null}
                            { this.state.routeInfo ? this.state.routeInfo.map((info)=><RouteInfo {...info}/>): null }
                        </div>
                      </div>
                      <div style = {styles.signature} className=""><p><em>ChickenBus - Travel Unlocked</em></p></div>
                      <ul className="collapsible z-depth-0" style={{marginBottom: '-3px'}}>
                          <li>
                            <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">description</i>About Us</div>
                            <div className="collapsible-body"><span>ChickenBus collects inter-city bus, ferry, and train schedules for low and middle-income countries and makes the schedules available for travelers. The website is currently available and a mobile app is coming soon.</span></div>

                          </li>
                           <li>
                             <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">directions_bus</i>How it Works</div>
                             <div className="collapsible-body "><span>Type in your origin and destination and click “Search.” If there are routes they will display on the map and in the results area below the search boxes. Currently we only offer inter-city transportation options in Nicaragua, but we are constantly collecting more data and opening more countries soon.</span></div>
                           </li>
                           <li>
                             <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">smartphone</i>Mobile App</div>
                             <div className="collapsible-body"><span>{Img}</span></div>
                             <div className="collapsible-body"><span>coming soon</span></div>
                           </li>
                           <li>
                             <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">map</i>Want to Help?</div>
                             <div className="collapsible-body"><span>If you have access to transportation data and want to make it available to the public, consider creating an account in order to upload your route data. Have a lot of data? We would love to talk ...</span></div>
                             <div className="collapsible-body"><p>Learn more about ChickenBus on our <a>href="http://maps.chickenbus.co/#/about" className="red-text red-lighten-1">About</a> page.</p></div>
                           </li>
                           <li>
                             <div className="collapsible-header"><i className="material-icons blue-grey-text text-darken-1">email</i>Contact</div>
                             <div className="collapsible-body"><span>Want to contribute? Have Questions? Feel free to contact us at ridethechickenbus@gmail.com.</span></div>
                           </li>

                      </ul>
                      <div style = {styles.signature} className=""><p><em>ChickenBus - Travel Unlocked</em></p></div>
                    </div>

                    <div className=''>
                      <AdSense.Google client='ca-pub-2730168194482941'
                                    slot='7806394673'
                                    style={{width: '100%', height: 'auto'}}
                                    format='' />
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div className = "row">
                        <div style={{visibility: 'hidden', marginTop: '10px'}} className="col s12"><span className="flow-text">I am always full-width (col s12)</span></div>
                        <div style={{visibility: 'hidden'}} className="col s12"><span className="flow-text">I am always full-width (col s12)</span></div>
                        <a style={styles.icon}>
                          <a href="http://chickenbus.co" target="_blank" className="social-icon" style={{display: 'inline-block', width: '45px', height: '45px', position: 'relative', overflow: 'hidden', verticalAlign: 'middle'}}>
                            <div className="social-container" style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%'}}>
                              <svg className="social-svg" viewBox="0 0 64 64" style={{borderRadius: '50%', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', fillRule: 'evenodd'}}>
                                <g className="social-svg-background" style={{transition: 'fill 170ms ease-in-out', fill: 'white'}}>
                                  <circle cx="32" cy="32" r="31"></circle>
                                </g>
                                <g className="social-svg-icon" style={{transition: 'fill 170ms ease-in-out', fill: 'transparent'}}>
                                  <path d="M28.3875,32.0001C28.3875,32.0843 28.3683,32.1632 28.3633,32.2471L37.1647,36.6464C37.9182,36.0083 38.8823,35.61 39.9474,35.61C42.3418,35.6105 44.2821,37.5509 44.2821,39.945C44.2821,42.3418 42.3417,44.2821 39.9474,44.2821C37.551,44.2821 35.6127,42.3417 35.6127,39.945C35.6127,39.8587 35.6319,39.7816 35.6367,39.698L26.8353,35.2984C26.0795,35.9341 25.1177,36.3324 24.0526,36.3324C21.6584,36.3324 19.7179,34.3941 19.7179,32.0001C19.7179,29.6036 21.6584,27.6628 24.0526,27.6628C25.1176,27.6628 26.0798,28.0635 26.8353,28.6992L35.6367,24.2997C35.6319,24.2156 35.6127,24.1365 35.6127,24.0502C35.6127,21.6584 37.551,19.7179 39.9474,19.7179C42.3418,19.7179 44.2821,21.6584 44.2821,24.0502C44.2821,26.4466 42.3417,28.3875 39.9474,28.3875C38.88,28.3875 37.9178,27.9868 37.1647,27.3487L28.3633,31.7506C28.368,31.8347 28.3875,31.9138 28.3875,32.0001Z">
                                  </path>
                                </g>
                                <g className="social-svg-mask" style={{transition: 'fill 170ms ease-in-out', fill: 'black'}}>
                                  <path d="M0,0L64,0L64,64L0,64L0,0ZM28.3875,32.0001C28.3875,32.0843 28.3683,32.1632 28.3633,32.2471L37.1647,36.6464C37.9182,36.0083 38.8823,35.61 39.9474,35.61C42.3418,35.6105 44.2821,37.5509 44.2821,39.945C44.2821,42.3418 42.3417,44.2821 39.9474,44.2821C37.551,44.2821 35.6127,42.3417 35.6127,39.945C35.6127,39.8587 35.6319,39.7816 35.6367,39.698L26.8353,35.2984C26.0795,35.9341 25.1177,36.3324 24.0526,36.3324C21.6584,36.3324 19.7179,34.3941 19.7179,32.0001C19.7179,29.6036 21.6584,27.6628 24.0526,27.6628C25.1176,27.6628 26.0798,28.0635 26.8353,28.6992L35.6367,24.2997C35.6319,24.2156 35.6127,24.1365 35.6127,24.0502C35.6127,21.6584 37.551,19.7179 39.9474,19.7179C42.3418,19.7179 44.2821,21.6584 44.2821,24.0502C44.2821,26.4466 42.3417,28.3875 39.9474,28.3875C38.88,28.3875 37.9178,27.9868 37.1647,27.3487L28.3633,31.7506C28.368,31.8347 28.3875,31.9138 28.3875,32.0001Z">
                                  </path>
                                </g>
                              </svg>
                            </div>
                          </a>
                        </a>
                        <a style={styles.icon}>
                          <a href="http://facebook.com/ChickenBus.co" target="_blank" className="social-icon" style={{display: 'inline-block', width: '45px', height: '45px', position: 'relative', overflow: 'hidden', verticalAlign: 'middle'}}>
                            <div className="social-container" style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%'}}>
                              <svg className="social-svg" viewBox="0 0 64 64" style={{borderRadius: '50%', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', fillRule: 'evenodd'}}>
                                <g className="social-svg-background" style={{transition: 'fill 170ms ease-in-out', fill: 'white'}}>
                                  <circle cx="32" cy="32" r="31"></circle>
                                </g>
                                <g className="social-svg-icon" style={{transition: 'fill 170ms ease-in-out', fill: 'transparent'}}>
                                  <path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z">
                                  </path>
                                </g>
                                <g className="social-svg-mask" style={{transition: 'fill 170ms ease-in-out', fill: 'black'}}>
                                  <path d="M0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z">
                                  </path>
                                </g>
                              </svg>
                            </div>
                          </a>
                        </a>
                        <a style={styles.icon}>
                          <a href="http://twitter.com/ChickenBusCo" target="_blank" className="social-icon" style={{display: 'inline-block', width: '45px', height: '45px', position: 'relative', overflow: 'hidden', verticalAlign: 'middle'}}>
                            <div className="social-container" style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%'}}>
                              <svg className="social-svg" viewBox="0 0 64 64" style={{borderRadius: '50%', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', fillRule: 'evenodd'}}>
                                <g className="social-svg-background" style={{transition: 'fill 170ms ease-in-out', fill: 'white'}}>
                                  <circle cx="32" cy="32" r="31"></circle>
                                </g>
                                <g className="social-svg-icon" style={{transition: 'fill 170ms ease-in-out', fill: 'transparent'}}>
                                  <path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z">
                                  </path>
                                </g>
                                <g className="social-svg-mask" style={{transition: 'fill 170ms ease-in-out', fill: 'black'}}>
                                  <path d="M0,0v64h64V0H0z M44.7,25.5c0,0.3,0,0.6,0,0.8C44.7,35,38.1,45,26.1,45c-3.7,0-7.2-1.1-10.1-2.9 c0.5,0.1,1,0.1,1.6,0.1c3.1,0,5.9-1,8.2-2.8c-2.9-0.1-5.3-2-6.1-4.6c0.4,0.1,0.8,0.1,1.2,0.1c0.6,0,1.2-0.1,1.7-0.2 c-3-0.6-5.3-3.3-5.3-6.4c0,0,0-0.1,0-0.1c0.9,0.5,1.9,0.8,3,0.8c-1.8-1.2-2.9-3.2-2.9-5.5c0-1.2,0.3-2.3,0.9-3.3 c3.2,4,8.1,6.6,13.5,6.9c-0.1-0.5-0.2-1-0.2-1.5c0-3.6,2.9-6.6,6.6-6.6c1.9,0,3.6,0.8,4.8,2.1c1.5-0.3,2.9-0.8,4.2-1.6 c-0.5,1.5-1.5,2.8-2.9,3.6c1.3-0.2,2.6-0.5,3.8-1C47.1,23.4,46,24.5,44.7,25.5z">
                                  </path>
                                </g>
                              </svg>
                            </div>
                          </a>
                        </a>
                        <a style={styles.icon}>
                          <a href="https://www.linkedin.com/company/28149593/" target="_blank" className="social-icon" style={{display: 'inline-block', width: '45px', height: '45px', position: 'relative', overflow: 'hidden', verticalAlign: 'middle'}}>
                            <div className="social-container" style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%'}}>
                            <svg className="social-svg" viewBox="0 0 64 64" style={{borderRadius: '50%', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', fillRule: 'evenodd'}}>
                              <g className="social-svg-background" style={{transition: 'fill 170ms ease-in-out', fill: 'white'}}>
                                  <circle cx="32" cy="32" r="31"></circle>
                                </g>
                                <g className="social-svg-icon" style={{transition: 'fill 170ms ease-in-out', fill: 'transparent'}}>
                                  <path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z">
                                  </path>
                                </g>
                                <g className="social-svg-mask" style={{transition: 'fill 170ms ease-in-out', fill: 'black'}}>
                                  <path d="M0,0v64h64V0H0z M25.8,44h-5.4V26.6h5.4V44z M23.1,24.3c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1 c1.7,0,3.1,1.4,3.1,3.1C26.2,22.9,24.8,24.3,23.1,24.3z M46,44h-5.4v-8.4c0-2,0-4.6-2.8-4.6c-2.8,0-3.2,2.2-3.2,4.5V44h-5.4V26.6 h5.2V29h0.1c0.7-1.4,2.5-2.8,5.1-2.8c5.5,0,6.5,3.6,6.5,8.3V44z">
                                  </path>
                                </g>
                              </svg>
                            </div>
                          </a>
                        </a>

                        <div style={{visibility: 'hidden'}} className="col s12"><span className="flow-text">I am always full-width (col s12)</span></div>
                        <div style={{visibility: 'hidden'}} className="col s12"><span className="flow-text">I am always full-width (col s12)</span></div>
                        <div style={{visibility: 'hidden'}} className="col s12"><span className="flow-text">I am always full-width (col s12)</span></div>
                      </div>
                    </div>
                    <div className="container blue-grey lighten-2" style={{bottom:0, width: "100%", height:'5%'}} >
                      <p className="container blue-grey lighten-2">filler</p>
                    </div>
                    <div className="container blue-grey lighten-2" style={{ position:'absolute', bottom:0, width: "100%", height:'6%', opacity: 1.0 }} >
                      <div style={{ paddingTop: '10px', paddingLeft: '20px' }} className="grey-text text-lighten-2">Made by <a className=" amber-text text-darken-2"href="https://chickenbus.co/">ChickenBusLLC </a></div>
                    </div>
                </div>
                <div style={ styles.googleMap } className="z-depth-0">
                    <GoogleMap locationCoords={ this.state.originDestination } findRoute={ true } onDidRenderNewLocations={ this._onMapDidRenderNewLocations } />
                </div>
            </div>
        )
    }
    /*
    <footer className="page-footer blue-grey z-depth-0" style={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col s6">
            <p>With ChickenBus you will.</p>
          </div>
          <div className="col l2">
            <ul>
              <li><h6 className="amber-text text-darken-2">Links</h6></li>
              <li><a href="https://chickenbus.co/" className="grey-text text-lighten-2">Home</a></li>
              <li><a href="https://www.facebook.com/ChickenBus.co" className="grey-text text-lighten-2">Facebook</a></li>
              <li><a href="http://www.twitter.com/ChickenBusCo" className="grey-text text-lighten-2">Twitter</a></li>
              <li><a href="https://www.linkedin.com/company/28149593/" className="grey-text text-lighten-2">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
</footer>
    */

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
