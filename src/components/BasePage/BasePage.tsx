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
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

import { Container, Navbar, NavItem } from 'react-materialize';
import { Switch, Route, NavLink } from 'react-router-dom'

import Auth from '../../modules/Auth';

interface IBasePageState {
    content: JSX.Element;
    pivots?: JSX.Element[];
}

const styles: IBasePageStyles = getStyles();

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
        this._login = <Login onLogin={this.updatePivots}/>;
        this._register = <Register/>
        this.state = {
          content: this._searchContent
        }
    }

    public componentWillMount() {
        this.updatePivots();
    }

    public render() {
        return(
            <div>
                <Navbar brand="ChickenBus" right>
                    <li><NavLink to="/">Search</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                </Navbar>
                <div style={styles.content}>
                    <Route path="/" exact component={SearchContent} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        )
    }

    /**
     * Function called on pivot link clicked. Used to change the content
     * @param itemKey pivot item clicked
     */
    @autobind
    private onLinkClick(itemKey: PivotItem): void {
        let content: JSX.Element;
        document.body.style.overflow = "hidden";
        switch(itemKey.props.linkText){
          case 'Search':
            content = this._searchContent;
            break;
          case 'Route Entry':
            content = this._entryGate
            break;
          case 'Data Interface':
          document.body.style.overflow = "scroll";
            content = this._dataInterface
            break;
          case 'Login':
            content = this._login
            break;
          case 'Register':
            content = this._register
            break;
        case 'Logout':
            Auth.deauthenticateUser()
            window.location.reload()
        }
        this.setState({content: content})
    }

    @autobind
    private updatePivots(){
        let PivotItems: JSX.Element[] = [];
        if(Auth.isUserAuthenticated()){
            PivotItems.push(<PivotItem linkText='Search'/>);
            PivotItems.push(<PivotItem linkText='Route Entry'/>);
            PivotItems.push(<PivotItem linkText='Data Interface'/>);
            PivotItems.push(<PivotItem linkText='Logout'/>);
        }else{
            PivotItems.push(<PivotItem linkText='Search'/>);
            PivotItems.push(<PivotItem linkText='Register'/>);
            PivotItems.push(<PivotItem linkText='Login'/>);
        }
        this.setState({
            pivots: PivotItems,
            content: this._searchContent
        })
    }
}
