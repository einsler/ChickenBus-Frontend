import {
    IDataInterface,
    IDataInterfaceProps,
    IDataInterfaceStyles
} from './DataInterface.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import * as React from "react";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { getStyles } from "./DataInterface.styles";
import * as ReactDataGrid from 'react-data-grid';

const styles = getStyles();
var APIKEY = 'AIzaSyBUAfME2CHwOHyq4fT9VuMzkm7fIKpWNnY';
const routeColumns = [
  { key: 'id', name: 'ID' },
  { key: 'routename', name: 'route name', sortable: true },
  { key: 'duration', name: 'Duration', width: 100, sortable: true},
  { key: 'departuretimes', name: 'Departure Times', sortable: true},
  { key: 'cost', name: 'Cost', width: 50, sortable: true},
  { key: 'notes', name: 'Notes', width: 250 },
  { key: 'approved', name: 'Approved', sortable: true},
];

const userColumns = [
  { key: 'id', name: 'ID' },
  { key: 'username', name: 'Username', sortable: true },
  { key: 'email', name: 'Email', width: 100, sortable: true},
  { key: 'permission', name: 'Permission Level', sortable: true},
];

const stopColumns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title', width: 200, sortable: true },
];

interface IDataInterfaceState {
  routes: any[],
  users: any[],
  stops: any [],
  rows: any[],
  columns: any[],
}

export class DataInterface extends BaseComponent<IDataInterfaceProps, IDataInterfaceState> {
  private routeRows: any[];
  private userRows: any[];
  private stopRows: any[];
  constructor(props: IDataInterfaceProps) {
    super(props);
    this.state = {
      routes: [],
      users: [],
      stops: [],

      rows: [],
      columns: [],
    }
  }

  @autobind
  public loadTable(lever) {
    let that = this
    let rows = null
    let columns = null
    fetch('/api/' + lever).then((result: any) => {
      return result.json(); }).then(result => {
        let info = result.data
        if (info.length) {
          if( lever == 'routes' ){
            rows = that.createRouteRows(info);
            columns = routeColumns;
          }
          else if( lever == 'users' ){
            rows = that.createUserRows(info);
            columns = userColumns
          }
          else if( lever == 'stops' ){
            rows = that.createStopRows(info);
            columns = stopColumns
          }
          else{}
          that.setState({
            rows: rows,
            columns: columns
          });
        }
      }).catch(err => {
        console.log(err)
        that.setState({
          rows: undefined,
          columns: routeColumns
        });
      });
  }
  @autobind
  public loadRoutes() {
    let that = this
    let rows = null
    fetch('/api/routes').then((result: any) => {
      return result.json(); }).then(result => {
        let info = result.data
        if (info.length) {
          rows = that.createRouteRows(info);
          that.setState({
            rows: rows,
            columns: routeColumns
          });
        }
        }).catch(err => {
          console.log(err)
          that.setState({
            rows: undefined,
            columns: routeColumns
          });
        });
  }
  @autobind
  public loadUsers() {
    let that = this
    let rows = null
    fetch('/api/users').then((result: any) => {
      return result.json(); }).then(result => {
        let info = result.data
        if (info.length) {
          rows = that.createUserRows(info);
          that.setState({
            rows: rows,
            columns: userColumns
          });
        }
        }).catch(err => {
          console.log(err)
          that.setState({
            rows: undefined,
            columns: userColumns
          });
        });
  }

  @autobind
  public loadStops() {
    let that = this
    let rows = null
    fetch('/api/stops').then((result: any) => {
      return result.json(); }).then(result => {
        let info = result.data
        if (info.length) {
          rows = that.createStopRows(info);
          that.setState({
            rows: rows,
            columns: stopColumns
          });
        }
        }).catch(err => {
          console.log(err)
          that.setState({
            rows: undefined,
            columns: stopColumns
          });
        });
  }

  @autobind
  public createRouteRows(routes) {
    let _routeRows = [];
    for (let i = 1; i < routes.length; i++) {
      _routeRows.push({
          id: routes[i]._id,
          routename: routes[i].properties.name,
          duration: routes[i].properties.duration,
          departuretimes: routes[i].properties.departureTimes.saturday[0],
          cost: routes[i].properties.cost,
          notes: routes[i].properties.notes,
          approved: routes[i].properties.approved.toString(),
      });
    }
    return _routeRows;
  }

  @autobind
  public createUserRows(users) {
    let _userRows = [];
    for (let i = 1; i < users.length; i++) {
      _userRows.push({
          id: users[i]._id,
          username: users[i].username,
          email: users[i].email,
          permission: users[i].permissionLevel,
      });
    }
    return _userRows;
  }

  @autobind
  public createStopRows(stops) {
    let _stopRows = [];
    for (let i = 1; i < stops.length; i++) {
      _stopRows.push({
          id: stops[i]._id,
          title: stops[i].title,
      });
    }
    return _stopRows;
  }

  public rowGetter(i) {
    return this.state.rows[i]
  }

  public render() {
    return (
      <div style={ styles.root }>
          <div style={styles.header}>
            <Label> Super Secret Admin Gui </Label>
            <CommandButton text='Bus Routes' onClick={this.loadRoutes}/>
            <CommandButton text='Users' onClick={this.loadUsers}/>
            <CommandButton text='Stops' onClick={this.loadStops}/>
            <div>
              <CommandButton text='Edit'/>
              <CommandButton text='Delete'/>
            </div>
          </div>
          <ReactDataGrid
            minHeight={500}
            columns = {this.state.columns}
            rowGetter={this.rowGetter.bind(this)}
            rowsCount={this.state.rows? this.state.rows.length: 0}
          />
      </div>
    );
  }
}
