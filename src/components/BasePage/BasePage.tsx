import {
    IBasePage,
    IBasePageProps,
    IBasePageStyles
} from './BasePage.Props';
import { BaseComponent, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Persona } from 'office-ui-fabric-react/lib/Persona';
import * as React from 'react';
import { HomeContent, SearchContent, DataInterface, EnterGate, Login, Register} from "../index";
import { getStyles } from "./BasePage.styles";
import { examplePersona } from "../../MockData/FrontEndConsts";

import { Container, Navbar, NavItem, Button } from 'react-materialize';
import { Switch, Route, NavLink } from 'react-router-dom'

import Auth from '../../modules/Auth';


interface IBasePageState {
    content: JSX.Element;
    navItems?: JSX.Element[];
}


const styles: IBasePageStyles = getStyles();
const logo = require('../../images/logo.png');
var Img = <img style={styles.logo} src={logo} />

export class BasePage extends BaseComponent<IBasePageProps, IBasePageState> {
    private _searchContent: JSX.Element;
    private _entryGate: JSX.Element;
    private _dataInterface: JSX.Element;
    private _login: JSX.Element;
    private _register: JSX.Element;


    constructor(props: IBasePageProps) {
        super(props);
        this._searchContent = <SearchContent/>;
        this._entryGate = <EnterGate/>;
        this._dataInterface = <DataInterface/>;
        this._login = <Login onLogin={this.updateNavLinks}/>;
        this._register = <Register/>
        this.state = {
          content: this._searchContent
        }
    }

    public componentWillMount() {
        this.updateNavLinks();
    }

    public render() {
        return(
            <div>
                <Navbar className="blue-grey lighten-2" style={styles.nav} brand={Img} right>

                    {this.state.navItems}
                </Navbar>
                <div style={styles.content}>
                    <Route path="/" exact component={SearchContent} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login}/>
                    <Route path="/route-entry" component={EnterGate} />
                    <Route path="/data-interface" component={DataInterface}/>
                </div>
            </div>
        )
    }

    @autobind
    private updateNavLinks(){
        let NavLinks: JSX.Element[] = [];
        console.log('update navlinks called');
        if(Auth.isUserAuthenticated()){
            NavLinks.push(<li><NavLink to="/">Search</NavLink></li>);
            NavLinks.push(<li><NavLink to="/route-entry">Route Entry</NavLink></li>);
            NavLinks.push(<li><NavLink to="/data-interface">Data Interface</NavLink></li>);
            NavLinks.push(<li><Button flat onClick={this.logout}>Logout</Button></li>);
        }else{
            NavLinks.push(<li><NavLink to="/">Search</NavLink></li>);
            NavLinks.push(<li><NavLink to="/register">Register</NavLink></li>);
            NavLinks.push(<li><NavLink to="/login">Login</NavLink></li>);
        }
        this.setState({
            navItems: NavLinks
        });
    }

    @autobind
    private logout(){
        Auth.deauthenticateUser();
        window.location.href = "/";
    }
}
