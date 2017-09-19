import {
    ISearchContent,
    ISearchContentProps,
    ISearchContentStyles
} from './SearchContent.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import{ SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox';
import{ DatePicker } from 'office-ui-fabric-react/lib/components/DatePicker';
import * as React from "react";
import { Button } from "office-ui-fabric-react/lib/components/Button";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { getStyles } from './SearchContent.styles'

const styles = getStyles();

interface ISearchContentState {
}

export class SearchContent extends BaseComponent<ISearchContentProps, ISearchContentState> {
    constructor(props: ISearchContentProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.searchPanel }>
                    <Label required={ true }> Origin </Label>
                    <SearchBox style={{ width: '30%', float: 'left'}} labelText='Managua, Nicaragua' />
                    <Label required={ true }> Destination </Label>
                    <SearchBox labelText='Masaya, Nicaragua' />
                    <Label required={ true }> Depart Date </Label>
                    <DatePicker placeholder='Choose the date to leave' isRequired={ true }/>
                    <Label> Arrive by Date </Label>
                    <DatePicker placeholder='Latest date to arrive' />
                    <Button text='Search'/>
                </div>
                <iframe style={ styles.googleMap } src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12924.499537941252!2d-79.0588559!3d35.9194431!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1505772467532"/>
            </div>
        )
    }
}