import * as React from "react";
import * as ReactDataGrid from 'react-data-grid';
import {
    IDataInterface,
    IDataInterfaceProps,
    IDataInterfaceStyles
} from './DataInterface.Props';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import { getStyles } from "./DataInterface.styles";

const styles = getStyles();

interface IDataInterfaceState {
  routes: any[], users: any[], stops: any [],
  rows: any[], columns: any[],
}

export class DataInterface extends BaseComponent<IDataInterfaceProps, IDataInterfaceState> {
  private routeRows: any[];
  private userRows: any[];
  private stopRows: any[];
  constructor(props: IDataInterfaceProps) {
    super(props);
    this.state = {
      routes: [], users: [], stops: [],
      rows: [], columns: [],
    }
  }

  public render() {
    return (
      <div style={ styles.root }>
          <div style={styles.header}>
            <Label> Super Secret Admin Gui </Label>
            <CommandButton text='Bus Routes' onClick={() => this.loadTable('routes')}/>
            <CommandButton text='Users' onClick={() => this.loadTable('users')}/>
            <CommandButton text='Stops' onClick={() => this.loadTable('stops')}/>
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

  @autobind
  public loadTable(lever) {
    /*
      input: string... exclusive 'lever' to modes {routes, users, stops}
      1) makes fetch calls depending on mode
      2) sets state of row and column built off of respective mode//fetch
    */
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
  public createRouteRows(routes) {
    /*
      conditional row build function for routes called by loadTable
    */
    let _routeRows = [];
    for (let i = 0; i < routes.length; i++) {
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
    /*
      conditional row build function for users called by loadTable
    */
    let _userRows = [];
    for (let i = 0; i < users.length; i++) {
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
    /*
      conditional row build function for stops called by loadTable
    */
    let _stopRows = [];
    for (let i = 0; i < stops.length; i++) {
      _stopRows.push({
          id: stops[i]._id,
          longitude: stops[i].geometry.coordinates[0],
          latitude: stops[i].geometry.coordinates[1],
      });
    }
    return _stopRows;
  }

  @autobind
  public select(){
    /*
      TO BE BUILT SELECT FUNCTION
        opens separate window instead of table for single specified route, user, or stops
        edit and delete buttons here?
    */
  }

  @autobind
  public edit(){
    /*
      TO BE BUILT EDIT FUNCTION
    */
  }

  @autobind
  public delete(){
    /*
      TO BE BUILT DELETE FUNCTION
    */
  }

  @autobind
  public rowGetter(i) {
    /*
      basic iteratator function necessary for react-data-grid
    */
    return this.state.rows[i]
  }

  public componentWillMount(){
    /*
      React initializer: sets default to route table manager
    */
    this.loadTable('routes');
  }
}

const routeColumns = [
  /*
    table-columns structure for routes
  */
  { key: 'id', name: 'ID' },
  { key: 'routename', name: 'route name', sortable: true },
  { key: 'duration', name: 'Duration', sortable: true},
  { key: 'departuretimes', name: 'Departure Times', sortable: true},
  { key: 'cost', name: 'Cost', sortable: true},
  { key: 'notes', name: 'Notes' },
  { key: 'approved', name: 'Approved', sortable: true},
];

const userColumns = [
  /*
    table-columns structure for users
  */
  { key: 'id', name: 'ID' },
  { key: 'username', name: 'Username', sortable: true },
  { key: 'email', name: 'Email', sortable: true},
  { key: 'permission', name: 'Permission Level', sortable: true},
];

const stopColumns = [
  /*
    table-columns structure for stops
  */
  { key: 'id', name: 'ID' },
  { key: 'longitude', name: 'Longitude', sortable: true },
  { key: 'latitude', name: 'Latitude', sortable: true },
];
