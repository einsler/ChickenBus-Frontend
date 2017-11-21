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
import { HomeContent, SearchContent, EnterGate, Login, Register} from "../index";
import { getStyles } from "./BasePage.styles";
import { examplePersona } from "../../MockData/FrontEndConsts";
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

interface IBasePageState {
    content: JSX.Element;
}

const styles: IBasePageStyles = getStyles();

export class BasePage extends BaseComponent<IBasePageProps, IBasePageState> {
    private _searchContent: JSX.Element;
    private _entryGate: JSX.Element;
    private _login: JSX.Element;
    private _register: JSX.Element;

    constructor(props: IBasePageProps) {
        super(props);
        this._searchContent = <SearchContent/>;
        this._entryGate = <EnterGate/>;
        this._login = <Login/>;
        this._register = <Register/>
        this.state = {
          content: this._searchContent
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.header }>
                    <div style = {styles.pivot}>
                        <Pivot onLinkClick = {this.onLinkClick}>
                          <PivotItem linkText='Search'/>
                          <PivotItem linkText='Register'/>
                          <PivotItem linkText='Login'/>
                          <PivotItem linkText='Route Entry'/>
                        </Pivot>
                    </div>
                </div>
                <div>
                  {this.state.content}
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
        switch(itemKey.props.linkText){
          case 'Search':
            content = this._searchContent;
            break;
          case 'Route Entry':
            content = this._entryGate
            break;
          case 'Login':
            content = this._login
            break;
          case 'Register':
            content = this._register
            break;
        }
        this.setState({content: content})
    }
}
