import {
    IRegister,
    IRegisterProps,
    IRegisterStyles
} from './Register.Props';
import { BaseComponent, getRTL, autobind } from "office-ui-fabric-react/lib/Utilities";
import { List } from "office-ui-fabric-react/lib/List";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { getStyles } from "./Register.styles";
//import { exampleBlogItem } from "../../MockData/FrontEndConsts";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as React from "react";

interface IRegisterState {
}
const styles: IRegisterStyles = getStyles();

export class Register extends BaseComponent<IRegisterProps, IRegisterState> {
    private _username: TextField;
    private _email: TextField;
    private _password: TextField;

    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
          <div style={ styles.root }>
                Username: <TextField componentRef={this._resolveRef("_username")}/>
                Email: <TextField componentRef={this._resolveRef("_email")}/>
                Password: <TextField componentRef={this._resolveRef("_password")}/>
                <button onClick={this._onRegister}> Register </button>
          </div>
        )
    }

    @autobind
    private _onRegister() {
        let registerDetails = {
            username: this._username.value,
            email: this._email.value,
            password: this._password.value
        };

        fetch('/auth/register', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(registerDetails)
        }).then((res: any) => {
            if(!res.ok){
                throw Error(res.statusText);
            }else{
                return res.json()
            }
        }).then(responseJson => {
            console.log(responseJson);
        }).catch(err => {
            console.log(err);
        });
    }
}
