import {
    IHomeContent,
    IHomeContentProps,
    IHomeContentStyles
} from './HomeContent.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

interface IHomeContentState {
}

export class HomeContent extends BaseComponent<IHomeContentProps, IHomeContentState> {
    constructor(props: IHomeContentProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
            <div>
                <p>Place Holder for home</p>
            </div>
        )
    }
}