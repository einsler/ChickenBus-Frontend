import {
    IBasePage,
    IBasePageProps,
    IBasePageStyles
} from './BasePage.Props';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Persona } from 'office-ui-fabric-react/lib/Persona';
import * as React from 'react';
import { autobind } from "@uifabric/utilities/lib";
import { HomeContent, SearchContent } from "../index";
import { getStyles } from "./BasePage.styles";
import { examplePersona } from "../../MockData/MockFrontEnd";

interface IBasePageState {
    contentKey: string;
}

const styles: IBasePageStyles = getStyles();


export class BasePage extends BaseComponent<IBasePageProps, IBasePageState> {    
    constructor(props: IBasePageProps) {
        super(props);
        this.state = {
            contentKey: 'home'
        }
    }

    public render() {
        console.log(styles.header);
        return(
            <div>
                <div style={ styles.header }> 
                    <div>
                        <h2>Place Holder for logo</h2>
                    </div>
                    <div>
                        <Persona { ...examplePersona} />
                    </div>
                </div>
                <Pivot
                    initialSelectedKey= { this.state.contentKey }
                    selectedKey={ this.state.contentKey }
                    onLinkClick={ this._handleLinkClick }
                    getTabId={ this._getTabId}>
                    <PivotItem 
                        linkText='Home'>
                        <HomeContent/>
                    </PivotItem>
                    <PivotItem 
                        linkText='Search'>
                        <SearchContent/>
                    </PivotItem>
                </Pivot>
            </div>
        )
    }

    @autobind
    private _handleLinkClick(item: PivotItem): void {
        this.setState({
            contentKey: item.props.itemKey
        })
    }

    @autobind
    private _getTabId(itemKey: string): string {
        return `NavigationPivot_${itemKey}`;
    }
}