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
import { HomeContent, SearchContent, EnterGate } from "../index";
import { getStyles } from "./BasePage.styles";
import { examplePersona } from "../../MockData/FrontEndConsts";

interface IBasePageState {
    content: JSX.Element;
}

const styles: IBasePageStyles = getStyles();

export class BasePage extends BaseComponent<IBasePageProps, IBasePageState> {
    constructor(props: IBasePageProps) {
        super(props);
        this.state = {
          content: <SearchContent/>
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.header }>
                    <div style = {styles.pivot}>
                      <Pivot onLinkClick = {this.onLinkClick}>
                        <PivotItem linkText='Search'/>
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

    @autobind
    private _getTabId(itemKey: string): string {
        return `NavigationPivot_${itemKey}`;
    }

    @autobind
    private onLinkClick(itemKey: PivotItem): void {
        let content: JSX.Element;
        switch(itemKey.props.linkText){
          case 'Search':
            content = <SearchContent/>
            break;
          case 'Route Entry':
            content = <EnterGate/>
            break;
        }
        this.setState({content: content})
    }
}
