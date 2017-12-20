import {
    IRegister,
    IRegisterProps,
    IRegisterStyles
} from './Register.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from "office-ui-fabric-react/lib/Label";
import { getStyles } from "./Register.styles";
import { Container, Navbar, NavItem, Button, Input } from 'react-materialize';

import * as React from "react";

interface IRegisterState {
}
const styles: IRegisterStyles = getStyles();

export class Register extends BaseComponent<IRegisterProps, IRegisterState> {
    private _username: HTMLInputElement;
    private _email: HTMLInputElement;
    private _password: HTMLInputElement;

    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
          <div style={ styles.root }>
                <Input placeholder="Username" validate ref={this._resolveRef("_username")}/>
                <Input placeholder="Email" type="email" validate ref={this._resolveRef("_email")}/>
                <Input placeholder="Password" type="password" validate ref={this._resolveRef("_password")}/>
                <div style={styles.registerButton}>
                    <Button onClick={this._onRegister}> Register </Button>
                </div>
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
