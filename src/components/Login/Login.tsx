import {
    ILogin,
    ILoginProps,
    ILoginStyles
} from './Login.Props';
import { BaseComponent, getRTL } from "office-ui-fabric-react/lib/Utilities";
import { List } from "office-ui-fabric-react/lib/List";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { getStyles } from "./Login.styles";
//import { exampleBlogItem } from "../../MockData/FrontEndConsts";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as React from "react";

interface ILoginState {
}
const styles: ILoginStyles = getStyles();

export class Login extends BaseComponent<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
          <div style={ styles.root }>
          </div>
        )
    }
}
