import * as React from 'react';
import {
    ILogContent,
    ILogContentProps,
    ILogContentStyles
} from './LogContent.Props';
import { BaseComponent, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './LogContent.styles'

const styles = getStyles();

interface ILogContentState {
}

export class LogContent extends BaseComponent<ILogContentProps, ILogContentState> {

    constructor(props: ILogContentProps) {
        super(props);
    }

    public render() {
        return(
            <div style={ styles.root }>
            </div>
        )
    }
}
