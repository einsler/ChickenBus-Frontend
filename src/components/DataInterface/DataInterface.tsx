import {
    IDataInterface,
    IDataInterfaceProps,
    IDataInterfaceStyles
} from './DataInterface.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import * as React from "react";
import { getStyles } from "./DataInterface.styles";

//READ 1
//CREATE
//EDIT
//DELETE

const styles = getStyles();
interface IDataInterfaceState {

}

var APIKEY = 'AIzaSyBUAfME2CHwOHyq4fT9VuMzkm7fIKpWNnY';
var currID = 0;

export class DataInterface extends BaseComponent<IDataInterfaceProps, IDataInterfaceState> {
  constructor(props: IDataInterfaceProps) {
      super(props);
      this.state = {
        routes: [],
        currID: 0,
      }
  }

  private _loadRoutes() {
    fetch('http://chickenbus-backend-einsler.cloudapps.unc.edu/api/routes/find')
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.directions.length) {
            this.setState({
              routes: responseJson.routes
            });
          }
        }).catch(e => {
          this.setState({
            routes: undefined,
        });
        });
  }

  private _editRoute(ID: number) {
    fetch('http://chickenbus-backend-einsler.cloudapps.unc.edu/api/routes/find'
    , {
      method: 'put',
    }
    )
    .then(response => response.json())
    .then(responseJson => {
    //console.log(responseJson)
    if (responseJson) {
      this.setState({
        routes: responseJson.routes
      });
    }
    }).catch(e => {
      this.setState({
        routes: undefined,
      });
    });
  }

  _deleteRoute(ID: number) {
    fetch('http://chickenbus-backend-einsler.cloudapps.unc.edu/api/routes/'
      + ID, {
        method: 'delete',
      }
    )
      .then(response => response.json())
      .then(responseJson => {
      //console.log(responseJson)
      if (responseJson) {
        this.setState({
          routes: responseJson.routes
        });
      }
      }).catch(e => {
        this.setState({
          routes: undefined,
        });
      });
  }

  public render() {
    return(
    <div style={ styles.root }>
      <div style={ styles.index }>
        <CommandButton text='Load' onClick={this._loadRoutes}/>
      </div>
      <div style={ styles.manageRoute }>
        <div style={ styles.routeInfo }>
          singular route info
          - origin destination
          - name
          - times
          - cost
          - notes
          - coordinates
        </div>
        <div style={ styles.buttonContainer }>
          <CommandButton text='Edit' />
          <CommandButton text='Delete' />
        </div>
      </div>
    </div>
    )
  }
}
