import {
    IDataInterface,
    IDataInterfaceProps,
    IDataInterfaceStyles
} from './DataInterface.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import * as React from "react";
import { getStyles } from "./DataInterface.styles";
import * as ReactDataGrid from 'react-data-grid';

const styles = getStyles();
var APIKEY = 'AIzaSyBUAfME2CHwOHyq4fT9VuMzkm7fIKpWNnY';
var currID = 0;

interface IDataInterfaceState {
}

export class DataInterface extends BaseComponent<IDataInterfaceProps, IDataInterfaceState> {
  private _columns;
  private _rows;
  private _routes;
  constructor(props: IDataInterfaceProps) {
    super(props);
    this.props = props;
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'routename', name: 'routename' },
      { key: 'duration', name: 'Duration' },
      { key: 'cost', name: 'Cost' },
      { key: 'approved', name: 'Approved' },
    ];
    this.state = {
      _routes: [],
    }
  }

  createRows() {
    let rows = [];
    //this._routes.length
    for (let i = 1; i < 5; i++) {
      rows.push({
          // id: this._routes[i].id,
          // routename: this._routes[i].properties.name,
          // duration: this._routes[i].properties.duration,
          // cost: this._routes[i].properties.cost,
          // approved: this._routes[i].properties.approved,
          id: i,
          routename: 'route: ' + i,
          duration: 50,
          cost: 20,
          approved: 'false',
      });
    }
    this._rows = rows;
  }

  rowGetter(i) {
    return this._rows[i]
  }

  render() {
    return (
      <ReactDataGrid
        minHeight={500}
        columns = {this._columns}
        rowGetter={this.rowGetter.bind(this)}
        rowsCount={this._rows.length}
        />
    );
  }

componentDidMount() {
    fetch('/api/routes')
        .then((result: any) => {
          return result.json();
      }).then(data => {
        console.log(data)
        let _routes = data
        if (data.length) {
            this.setState({
              _routes: _routes
            });
          }
        }).catch(err => {
          console.log('hello')
          this.setState({
            _routes: undefined,
        });
        });
  }
}
