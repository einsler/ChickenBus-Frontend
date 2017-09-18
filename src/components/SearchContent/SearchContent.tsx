import {
    ISearchContent,
    ISearchContentProps,
    ISearchContentStyles
} from './SearchContent.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

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
            <div>
                <p>Place holder for search</p>
            </div>
        )
    }
}