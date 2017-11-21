import {
    IProfile,
    IProfileProps,
    IProfileStyles
} from './Profile.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

interface IProfileState {

}

export class Profile extends BaseComponent<IProfileProps, IProfileState> {

    constructor(props: IProfileProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
            <div>
                Basic Login Page:
                Input Username: ********
                Input Password: ********
            </div>
        );
    }

}
