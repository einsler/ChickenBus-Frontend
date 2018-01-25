import {
    ILogin,
    ILoginProps,
    ILoginStyles
} from './Login.Props';
import { BaseComponent, getRTL, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from "office-ui-fabric-react/lib/Label";
import { getStyles } from "./Login.styles";
import * as React from "react";
import { Container, Navbar, NavItem, Button, Input, Row} from 'react-materialize';

import Auth from "../../modules/Auth";

interface ILoginState {
}
const styles: ILoginStyles = getStyles();

export class Login extends BaseComponent<ILoginProps, ILoginState> {
    private _username: Input;
    private _password: Input;

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            errors: {},
            user: {
                username: '',
                password: '',
                permissionLevel: null
          }
        }
    }

    public render() {
        return(
          <div style={ styles.root }>
            <form onSubmit={this._onLoginPress}>
              <Input label="Username" name="username" validate />
              <Input label="Password" type="password" name="password" validate/>
              <div style={styles.loginButton}>
                  <Button type="submit"> Login </Button>
              </div>
            </form>
          </div>
        )
    }

    @autobind
    private _onLoginPress(event) {
        event.preventDefault();

        let loginDetails = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        console.log(loginDetails);

        fetch('/auth/login', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(loginDetails)
        }).then((res: any) => {
            if(!res.ok){
                this.setState({errors: res});
                alert("Could not log you in successfully. Please check login credentials");
                throw Error(res.statusText);
            }else{
                return res.json();
            }
        }).then(responseJson => {
            Auth.authenticateUser(responseJson.token);
            this.setState({user: responseJson.user});
            window.location.href = "/"
        }).catch(err => {
            console.log(err);
        });
    }
}
