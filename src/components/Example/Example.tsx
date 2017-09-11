import {
    IExample,
    IExampleProps,
    IExampleStyles
} from './Example.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

interface IExampleState {
    title: string;
    text?: string;
}

export class Example extends BaseComponent<IExampleProps, IExampleState> {
    constructor(props: IExampleProps) {
        super(props);
        this.state = {
            title: props.title,
            text: props.text
        }
    }

    public render() {
        return(
            <div>
                <h1> { this.state.title } </h1>
                <p> { this.state.text } </p>
            </div>
        )
    }
}