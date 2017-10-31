import {  ILogContent,  ILogContentProps,  ILogContentStyles } from './LogContent.Props';
import { BaseComponent, getRTL } from "office-ui-fabric-react/lib/Utilities";
import { List } from "office-ui-fabric-react/lib/List";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { getStyles } from "./LogContent.styles";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as React from "react";

interface ILogContentState {
}
const styles: ILogContentStyles = getStyles();

export class LogContent extends BaseComponent<ILogContentProps, ILogContentState> {
    constructor(props: ILogContentProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
          <div style={ styles.root }>
              This page is reserved for Log Content
          </div>
        )
    }
}
