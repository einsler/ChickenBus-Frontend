import {
    ISearchContent,
    ISearchContentProps,
    ISearchContentStyles
} from './SearchContent.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import{ SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox';
import{ DatePicker } from 'office-ui-fabric-react/lib/components/DatePicker';
import * as React from "react";
import { Button } from "office-ui-fabric-react/lib/components/Button";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { getStyles } from './SearchContent.styles'
import { APIKey } from '../../MockData/MockFrontEnd'
import { GoogleMap } from "../GoogleMap/index";

const styles = getStyles();

interface ISearchContentState {
    googleURL?: string;
    origin?: string;
    destination?: string;
}

export class SearchContent extends BaseComponent<ISearchContentProps, ISearchContentState> {

    constructor(props: ISearchContentProps) {
        super(props);
        this.state = {
            googleURL: "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12924.499537941252!2d-79.0588559!3d35.9194431!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1505772467532"
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.searchPanel }>
                    <Label required={ true }> Origin </Label>
                    <SearchBox onChange={this.onOriginChange} style={{ width: '30%', float: 'left'}} labelText='Managua, Nicaragua' />
                    <Label required={ true }> Destination </Label>
                    <SearchBox onChange={this.onDestinationChange} labelText='Masaya, Nicaragua' />
                    <Label required={ true }> Depart Date </Label>
                    <DatePicker placeholder='Choose the date to leave' isRequired={ true }/>
                    <Label> Arrive by Date </Label>
                    <DatePicker placeholder='Latest date to arrive' />
                    <div style={ styles.searchButtonBox }>
                        <Button text='Search' onClick={ this.onRoute}/>
                    </div>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap />
                </div>
            </div>
        )
    }

    // <iframe width='100%' height='100%' src={ this.state.googleURL }/>

    @autobind
    public onRoute() {
        this.setState({googleURL: "https://www.google.com/maps/embed/v1/directions" +
            "?key=" + APIKey +
            "&origin=" + this.state.origin +
            "&destination=" + this.state.destination});
    }

    @autobind
    private onOriginChange(newValue: string) {
        console.log(this.state.origin)
        this.setState( {
                origin: newValue.replace(', ','+').replace(' ,','+').replace(' ','+').replace(',','+')
            }
        )
        console.log(this.state.origin)        
    }

    @autobind
    private onDestinationChange(newValue: string) {
        this.setState( {
                destination: newValue.replace(', ','+').replace(' ,','+').replace(' ','+').replace(',','+')
            }
        )
    }
}