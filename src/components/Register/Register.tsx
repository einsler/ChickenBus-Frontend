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
             <form onSubmit={this._onRegister}>
                <Input label="Username" name="username" validate/>
                <Input label="Email" type="email" name="email" validate/>
                <Input label="Password" type="password" name="password" validate/>
                <div style={styles.registerButton}>
                    <Button type="submit"> Register </Button>
                </div>
             </form>
          </div>
        )
    }

    @autobind
    private _onRegister(event) {
        event.preventDefault();

        let registerDetails = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
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
            alert("Register Successful");
        }).catch(err => {
            console.log(err);
        });
    }
}
