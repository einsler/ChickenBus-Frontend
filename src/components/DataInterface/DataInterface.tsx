import * as React from "react";
import * as ReactDataGrid from 'react-data-grid';
import {
    IDataInterface,
    IDataInterfaceProps,
    IDataInterfaceStyles
} from './DataInterface.Props';
import * as ReactModal from 'react-modal';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import { getStyles } from "./DataInterface.styles";


const styles = getStyles();

interface IDataInterfaceState {
  routes: any[], users: any[], stops: any [],
  rows: any[], columns: any[],

  showModal: any,
  currID: string
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
      showModal: false,
      currID: null
    };
    //this.handleOpenModal = this.handleOpenModal.bind(this);
    //this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  @autobind
  public handleOpenModal() {
    this.setState({
      showModal: true,
      currID: this.state.routes[0]._id,
      //set state of selected id information
    });
  }
  @autobind
  public handleCloseModal () {
    this.setState({ showModal: false });
  }

 //Modal grid or select screen
 //header is immutable
  public render() {
    return (
      <div style={ styles.root }>
          <div style={styles.header}>
            <Label> Super Secret Admin Gui </Label>
            <CommandButton text='Bus Routes' onClick={() => this.loadTable('routes')}/>
            <CommandButton text='Users' onClick={() => this.loadTable('users')}/>
            <CommandButton text='Stops' onClick={() => this.loadTable('stops')}/>
            <div>
              <CommandButton text = 'Modal' onClick={this.handleOpenModal} />
            </div>
          </div>
          <ReactDataGrid
            minHeight={500}
            columns = {this.state.columns}
            rowGetter={this.rowGetter.bind(this)}
            rowsCount={this.state.rows? this.state.rows.length: 0}
            minColumnWidth={100}
            enableCellSelect={true}
          />
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Select Screen"
            onRequestClose={this.handleCloseModal}
          >
            <Label>Select Screen</Label>
            <Label>Info from selected row, will have to build a function / edit backend to render based on type</Label>
            <Label>Logged ID and name, can call edits and deletes from here</Label>
            <CommandButton text='Edit' onClick={() => this.editEntry('current row id')}/>
            <CommandButton text='Delete' onClick={() => this.deleteEntry(this.state.currID, 'route')}/>
            <CommandButton text='Close' onClick={this.handleCloseModal} />
          </ReactModal>
      </div>
    );
  }
  public routeColumns = [
    /*
      table-columns structure for routes
    */
    { key: 'id', name: 'ID' },
    { key: 'routename', name: 'route name', resizable: true,
    events: {
          onDoubleClick: function(ev, args) {
            console.log('Displaying info for row' + args.rowIdx);
            alert('you double clicked row ' + args.rowIdx)
            //this.handleOpenModal(ev, args);
          }

    },
  },
    { key: 'duration', name: 'Duration', resizable: true},
    { key: 'departuretimes', name: 'Departure Times', sortable: true, resizable: true},
    { key: 'cost', name: 'Cost', sortable: true, resizable: true},
    { key: 'notes', name: 'Notes', resizable: true},
    { key: 'approved', name: 'Approved', sortable: true, resizable: true},
  ];

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
            that.setState({
              routes: info,
            });
            rows = that.createRouteRows(info);
            columns = this.routeColumns;
          }
          else if( lever == 'users' ){
            that.setState({
              users: info,
            });
            rows = that.createUserRows(info);
            columns = userColumns
          }
          else if( lever == 'stops' ){
            that.setState({
              stops: info,
            });
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
          columns: this.routeColumns
        });
      });
  }

  @autobind
  public loadSample(lever) {
    /*
      Sample code for local development on page infrastructure
      modeled after loadTable
      will combine into load Table
    */
    let that = this
    let rows = null
    let columns = null
    let info = null
    if( lever == 'routes' ){
      rows = that.createRouteRows(info);
      columns = this.routeColumns;
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

  @autobind
  public createRouteRows(routes) {
    /*
      conditional row build function for routes called by loadTable
    */
    let _routeRows = [];
    if(routes == null){
      //dev case
      console.log('testing case -- npm run dev')
      for (let i = 0; i < 27; i++) {
        _routeRows.push({
          id: i,
          routename: 'route '+i,
          duration: 10,
          departuretimes: 12,
          cost: 10,
          notes: 'sample notes',
          approved: 'false',
        });
      }
    }
    else{
      //production case
      console.log('production case -- npm start')
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
    }
    console.log(' ')
    return _routeRows;
  }

  @autobind
  public createUserRows(users) {
    /*
      conditional row build function for users called by loadTable
    */
    let _userRows = [];
    if(users == null){ //run dev case
      for (let i = 0; i < 5; i++) {
        _userRows.push({
          id: i,
          username: 'user ' + i,
          email: 'email '+ i,
          permission: 1,
        });
      }
    }
    else{ //production case
      for (let i = 0; i < users.length; i++) {
        _userRows.push({
          id: users[i]._id,
          username: users[i].username,
          email: users[i].email,
          permission: users[i].permissionLevel,
        });
      }
    }
    console.log(' ')
    return _userRows;
  }

  @autobind
  public createStopRows(stops) {
    /*
      conditional row build function for stops called by loadTable
    */
    let _stopRows = [];
    if (stops == null){
      alert('no stops in db, sample dev values');
      for (let i = 0; i < stops.length; i++) {
        _stopRows.push({
          id: stops[i]._id,
          longitude: stops[i].geometry.coordinates[0],
          latitude: stops[i].geometry.coordinates[1],
        });
      }
    }
    else{
      for (let i = 0; i < 5; i++) {
        _stopRows.push({
          id: i,
          longitude: 'longitude ' + i,
          latitude: 'latitude ' + i,
        });
      }
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
  public editEntry(id){
    /*
      TO BE BUILT EDIT FUNCTION
    */
    fetch('/api/routes/:id').then((result: any) => {
      return result.json(); }).then(result => {
        let res = result
        console.log(res.success)
        console.log(res.message.toString())
        if (res.success == false) {
          alert('route not found');
        }
        else{
          alert('route' + id + 'was successfully updated')
          //grid component should to be updated, probably not here though
        }
      }).catch(err => {
        console.log(err)
        alert('error')
      });
  }

  @autobind
  public deleteEntry(id, type){
    //if for type
    let currID = id
    fetch('/api/routes/:id', {
        method: 'delete',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(currID)
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

  @autobind
  public rowGetter(i) {
    /*
      basic iteratator function necessary for react-data-grid
    */
    return this.state.rows[i]
  }

  public componentWillMount(){
    /*
      React initializer: sets default to route table manager or sample
    */
    //this.loadSample('routes');
    this.loadTable('routes');

    ReactModal.setAppElement('body'); //necessary for modal view library
  }

}

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
