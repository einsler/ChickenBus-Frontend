import {
    IAbout,
    IAboutProps,
    IAboutStyles
} from './About.Props';
import { BaseComponent, getRTL, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from "office-ui-fabric-react/lib/Label";
import { getStyles } from "./About.styles";
import * as React from "react";
import { Container} from 'react-materialize';

import Auth from "../../modules/Auth";

interface IAboutState {
}
const styles: IAboutStyles = getStyles();

export class About extends BaseComponent<IAboutProps, IAboutState> {

    constructor(props: IAboutProps) {
        super(props);
        this.state = {
        }
    }

    public render() {

        return(
          <div style={ styles.root }>
            <h3> Welcome to ChickenBus </h3>
            <p className="grey-text">
              ChickenBus is a growing effort, with the current goal of constructing an accessible environment to display bus routes in Nicaragua.
              This is for the benefit of locals, travelers, and general commerce.
              There are far too many countries with no robust infrastructure for public transportation,
              and ChickenBus is a solution. Cross-bred from contact with local envoys and crowdsourcing, we are proud to bring you this information.
              If there is no information for a route when you do a search, it might be that we do not have this information yet. Rest assured We are working hard
              to collect this information! Visit our links below for ways to support us.
            </p>
            <h5> FAQS </h5>
            <ul>
            <li><p> Questions: Answer</p></li>
            <li><p> Why ChickenBus?</p></li>
            <li><p> example 3</p></li>
            <li><p> example 4</p></li>
            </ul>
          </div>

        )
    }
}
