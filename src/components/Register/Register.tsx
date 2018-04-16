import {
  IRegister,
  IRegisterProps,
  IRegisterStyles
} from './Register.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from "office-ui-fabric-react/lib/Label";
import { getStyles } from "./Register.styles";
import * as ReactModal from 'react-modal';
import { Container, Navbar, NavItem, Button, Input } from 'react-materialize';

import * as React from "react";

interface IRegisterState {
  showModal: any,

}
const styles: IRegisterStyles = getStyles();

export class Register extends BaseComponent<IRegisterProps, IRegisterState> {
  private _username: HTMLInputElement;
  private _email: HTMLInputElement;
  private _password: HTMLInputElement;

  constructor(props: IRegisterProps) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  public render() {
    return (
      <div style={styles.root}>
        <form onSubmit={this._onRegister}>
          <Input label="Username" name="username" validate />
          <Input label="Email" type="email" name="email" validate />
          <Input label="Password" type="password" name="password" validate />
          <div style={styles.registerButton}>
            <Button type="submit"> Register </Button>
          </div>
        </form>
        <Button className="blue-grey darken-2" onClick={this.handleOpenModal}>User Agreement</Button>
        <div style={styles.modal}>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Selection Screen"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnEsc={true}>

            <h5> User Agreement </h5>
            <h6> this is all user agreement information</h6>
            <a className="waves-effect blue-grey darken-2 waves-light btn" onClick={this.handleCloseModal}>Agree</a>
          </ReactModal>
        </div>
      </div>
    )
  }

  @autobind
  public handleOpenModal() {
    this.setState({ showModal: true });
  }
  @autobind
  public handleCloseModal() {
    this.setState({ showModal: false });
  }


  @autobind
  private _onRegister(event) {
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
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        return res.json()
      }
    }).then(responseJson => {
      alert("Register Successful");
    }).catch(err => {
      console.log(err);
    });
  }
}
