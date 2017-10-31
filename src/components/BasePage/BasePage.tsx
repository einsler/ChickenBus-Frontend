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
import { HomeContent, SearchContent, EnterGate, LogContent } from "../index";
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
    constructor(props: IBasePageProps) {
        super(props);
        this._searchContent = <SearchContent/>;
        this._entryGate = <EnterGate/>;
        this.state = {
          content: this._searchContent
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.header }>
                    <div style = {styles.pivot}>
                      <TooltipHost content='Please save before switching tabs!' id='myID' calloutProps={ { gapSpace: 0 } }>
                        <Pivot onLinkClick = {this.onLinkClick}>
                          <PivotItem linkText='Search'/>
                          <PivotItem linkText='Route Entry'/>
                          <PivotItem linkText='Route Log'/>
                        </Pivot>
                      </TooltipHost>
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
          case 'Route Log':
            content = <LogContent/>
            break;
        }
        this.setState({content: content})
    }
}
