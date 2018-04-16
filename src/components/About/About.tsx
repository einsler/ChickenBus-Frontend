import {
  IAbout,
  IAboutProps,
  IAboutStyles
} from './About.Props';
import { BaseComponent, getRTL, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from "office-ui-fabric-react/lib/Label";
import { getStyles } from "./About.styles";
import * as React from "react";
import { Container, Footer} from 'react-materialize';

import Auth from "../../modules/Auth";

interface IAboutState {
}
const styles: IAboutStyles = getStyles();
const about = require('../../images/about.jpg');
const emblem = require('../../images/emblem.png');
var Img = <img style={styles.emblem} src={emblem} />

export class About extends BaseComponent<IAboutProps, IAboutState> {

  constructor(props: IAboutProps) {
    super(props);
    this.state = {
    }
  }

  public render() {

    return (
      <div style={styles.root}>
        <div className='blue-grey lighten-5' style={styles.text}>
          <div style={styles.info}>
            <h3> Welcome to ChickenBus </h3>
            <p className="">
              ChickenBus collects inter-city bus, ferry, and train schedules for low and middle-income countries and makes the schedules available for travelers. The website is currently available and a mobile app is coming soon.
                </p>
            <p className="">
              <em>Mission:</em> Improve access to transportation in low and middle-income countries
                </p>
            <p className="">
              <em>Vision:</em> Provide users with all viable options to get from any two points on Earth.
                </p>
            <p className="">
              ChickenBus is a growing effort which currently offers inter-city bus and ferry route timetables in Nicaragua. We are in the process of expanding to Costa Rica and Honduras. Beyond that, we hope to cover all of Central America, South America, Sub-Saharan Africa, and Southeast Asia. Some day we hope to offer transportation options across the whole world.
                </p>
            <p className="">
              ChickenBus benefits tourists as well as citizens of the countries we serve. ChickenBus is a solution for all countries with no robust infrastructure for public transportation information. All of our data come from locals in the countries we serve. If there are no results for an origin-destination pair that you search, it might be that we do not have the information yet. Rest assured, we are working hard to collect this information! We are also developing the ability to recommend transfers between routes to optimize your trips.
                </p>
            <p className="">
              <em>ChickenBus – Travel Unlocked</em>
            </p>
          </div>
          <div style={styles.faq}>
            <h5> Frequently Asked Questions </h5>
            <ol>
              <li><h6>Why ChickenBus?</h6><p> ChickenBus is the best source of inter-city transportation information for low and middle-income countries. For many of these countries the information is not available online in any form.</p></li>
              <li><h6>Do the buses leave on time?</h6><p> Generally, yes, they absolutely do! The transportation sector is well managed and regulated. However, we always recommend arriving early. While we are always trying to capture schedule changes, sometimes the unexpected happens and your travel plans will need to change. Arriving early also increases your chances of getting a good seat.</p></li>
              <li><h6>Do the buses arrive to their destinations on time?</h6><p> Sometimes yes, sometimes no. Just like in all countries around the world, there may be traffic which delays the buses. Road conditions may also vary along the route, and weather could also slow things down. We recommend planning extra time into your trip for the unexpected.</p></li>
              <li><h6>What is ChickenBus’s social mission?...</h6></li>
            </ol>
          </div>
          <div style={styles.mission}>
            <h5> There are four tenets of ChickenBus’s social mission. </h5>
            <ol>
              <li><h6>Economic Development</h6><p>By improving access to transportation in low and middle-income countries, citizens will more easily be able to travel, build <strong>homegrown businesses</strong>, and bring their <strong>products to markets</strong></p></li>
              <li><h6>Community Tourism</h6><p> Sometimes communities that can most benefit from the tourism industry do not reap the rewards of travelers because travelers cannot access these locations. ChickenBus <strong>unlocks these locations</strong> and spurs the development of the <strong>sustainable tourism industry.</strong></p></li>
              <li><h6>Social Networks</h6><p> Traveling builds networks. Social networks are <strong>important for social cohesion</strong> and economic growth. ChickenBus will unlock travel for international tourists as well as country citizens and <strong>strengthen social networks</strong> around the world.</p></li>
              <li><h6>Greenhouse Gas Emissions</h6><p> Around the developing world car ownership is increasing and <strong>road congestion is increasingly becoming a problem</strong>. Making public transportation systems more efficient and usable is critical to <strong>preventing serious climate change.</strong></p></li>
            </ol>
          </div>
          <div style={{ textAlign: 'center', margin: '15px' }}>
            {Img}{Img}{Img}
          </div>
          <footer className="page-footer blue-grey lighten-1">
          <div className="container">
            <div className="row">
              <div className="col l4">
                <h5 className="white-text">ChickenBus</h5>
                <p className="grey-text text-lighten-4">Travel Unlocked</p>
                <p className="grey-text text-lighten-4">Nicaragua Pilot Launch 2018</p>

              </div>
              <div className="col l5">
                <h5 className="white-text">Help Us Grow</h5>
                <p className="grey-text text-lighten-4">Collecting hard to find routes and bringing them to you.</p>
                <p className="grey-text text-lighten-4">Mobile Application is coming soon.</p>
              </div>
              <div className="col l3">
                <h5 className="white-text">Connect</h5>
                <ul>
                  <li><a className="amber-text text-darken-1" href="http://facebook.com/ChickenBus.co">Facebook</a></li>
                  <li><a className="amber-text text-darken-1" href="http://www.twitter.com/ChickenBusCo">Twitter</a></li>
                  <li><a className="amber-text text-darken-1" href="https://www.linkedin.com/company/28149593/">GoFundMe</a></li>
                  <li><a className="amber-text text-darken-1" href="https://www.gofundme.com/chickenbus-company?sharetype=teams&member=44022&rcid=r01-152388675197-23ffd808e14a4dd1&pc=ot_co_campmgmt_w">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
                Made by ChickenBusLLC
            <a className="grey-text text-lighten-4 right" href="mailto:ridethechickenbus@gmail.com">ridethechickenbus@gmail.com</a>
            </div>
          </div>
        </footer>
        </div>
      </div>
    )
  }
}
