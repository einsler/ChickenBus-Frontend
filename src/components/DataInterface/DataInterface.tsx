import * as React from 'react';
import {
  IDataInterface,
  IDataInterfaceProps,
  IDataInterfaceStyles
} from './DataInterface.Props';
import * as ReactModal from 'react-modal';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import { TextField } from "office-ui-fabric-react/lib/components/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from "office-ui-fabric-react/lib/components/DetailsList";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { Modal } from "office-ui-fabric-react/lib/components/Modal";
import { Input, Button, TextInput } from 'react-materialize';
import { getStyles } from "./DataInterface.styles";

const styles = getStyles();

/*--Constants/Frameworks for Table Column Build-------------------------------*/
const routeColumns: IColumn[] = [
  { key: 'column1', name: 'Route Name', fieldName: 'routename', minWidth: 200, maxWidth: 235, isResizable: true, ariaLabel: 'Operations for routename' },
  { key: 'column2', name: 'Approved', fieldName: 'approved', minWidth: 45, maxWidth: 75, isResizable: true, ariaLabel: 'Operations for approved' },
  { key: 'column3', name: 'ID', fieldName: 'id', minWidth: 85, maxWidth: 190, isResizable: true, ariaLabel: 'Operations for id' },
  { key: 'column5', name: 'Cost', fieldName: 'cost', minWidth: 45, maxWidth: 75, isResizable: true, ariaLabel: 'Operations for cost' },
  { key: 'column4', name: 'Notes', fieldName: 'notes', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for notes' },
  //{ key: 'column3', name: 'Duration', fieldName: 'duration', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for duration'},
  //{ key: 'column4', name: 'Departure Times', fieldName: 'departuretimes', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for durationtimes'},


];

let userColumns: IColumn[] = [
  { key: 'column1', name: 'Email', fieldName: 'email', minWidth: 150, maxWidth: 250, isResizable: true, ariaLabel: 'Operations for email' },
  { key: 'column2', name: 'User Name', fieldName: 'username', minWidth: 150, maxWidth: 150, isResizable: true, ariaLabel: 'Operations for username' },
  { key: 'column3', name: 'Permission Level', fieldName: 'permission', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for permission' },
  { key: 'column4', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for id' },
];

let stopColumns: IColumn[] = [
  { key: 'column1', name: 'Stop Name', fieldName: 'stopname', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for stopname' },
  { key: 'column2', name: 'Approved', fieldName: 'approved', minWidth: 100, maxWidth: 125, isResizable: true, ariaLabel: 'Operations for approved' },
  { key: 'column3', name: 'Longitude', fieldName: 'longitude', minWidth: 100, maxWidth: 175, isResizable: true, ariaLabel: 'Operations for longitide' },
  { key: 'column4', name: 'Latitude', fieldName: 'latitude', minWidth: 100, maxWidth: 175, isResizable: true, ariaLabel: 'Operations for latitude' },
  { key: 'column5', name: 'ID', fieldName: 'id', minWidth: 150, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for id' },

];

interface IDataInterfaceState {
  routes: any[], users: any[], stops: any[],
  rows: any[], columns: any[],

  showModal: any,
  currID: string,
  screen: string,
  text: string,

  modalScreen?: JSX.Element[];
  selectionDetails: any[],
}


export class DataInterface extends BaseComponent<IDataInterfaceProps, IDataInterfaceState> {
  private routeRows: any[];
  private userRows: any[];
  private stopRows: any[];
  private _selection: Selection;

  selectionDetails: any[];

  constructor(props: IDataInterfaceProps) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.state = {
      routes: [], users: [], stops: [],
      rows: [], columns: [],
      showModal: false,
      currID: '',
      screen: '',
      text: '',

      selectionDetails: this._getSelectionDetails(),
    };

  }

  /*--Initialization------------------------------------------------------------*/
  public componentWillMount() {
    this.loadTable('routes');
    ReactModal.setAppElement('body'); //necessary for modal view library
    //maybe recall on edits and deletes
  }
  /*--Table-Helper-Functions----------------------------------------------------*/
  @autobind
  public loadTable(lever) {
    let that = this
    let rows, columns = null
    fetch('/api/' + lever).then((result: any) => {
      return result.json();
    }).then(result => {
      let info = result.data
      if (info.length) { //successful data fetch
        if (lever == 'routes') {
          that.setState({
            screen: 'routes',
            routes: info,
          });
          rows = that.createRouteRows(info);
          columns = routeColumns;
        }
        else if (lever == 'users') {
          that.setState({
            screen: 'users',
            users: info,
          });
          rows = that.createUserRows(info);
          columns = userColumns
        }
        else if (lever == 'stops') {
          that.setState({
            screen: 'stops',
            stops: info,
          });
          rows = that.createStopRows(info);
          columns = stopColumns
        }
        else { }
        that.setState({
          rows: rows,
          columns: columns
        });
      }
    }).catch(err => { //failed, run dev case
      console.log(err)
      if (lever == 'routes') {
        rows = that.createRouteRows(null);
        that.setState({
          screen: 'routes',
          routes: rows,
        });
        columns = routeColumns;
      }
      else if (lever == 'users') {
        rows = that.createUserRows(null);
        that.setState({
          screen: 'users',
          users: rows,
        });
        columns = userColumns
      }
      else if (lever == 'stops') {
        rows = that.createUserRows(null);
        that.setState({
          screen: 'stops',
          stops: rows,
        });
        columns = stopColumns
      }
      else { }
      that.setState({
        rows: rows,
        columns: columns
      });
    });
  }

  @autobind
  public createRouteRows(routes) {
    let _routeRows = [];
    if (routes == null) { //dev case
      console.log('testing case -- npm run dev')
      for (let i = 0; i < 27; i++) {
        _routeRows.push({
          key: i,
          id: 'id' + i,
          routename: 'route ' + i,
          duration: 10,
          departuretimes: 12,
          cost: 10,
          notes: 'sample notes',
          approved: 'false',
        });
      }
    }
    else { //production case
      for (let i = 0; i < routes.length; i++) {
        _routeRows.push({
          key: i,
          id: routes[i]._id,
          routename: routes[i].properties.name,
          duration: routes[i].properties.duration,
          departuretimes: routes[i].properties.departureTimes,
          cost: routes[i].properties.cost,
          notes: routes[i].properties.notes,
          approved: routes[i].properties.approved.toString(),
        });
      }
    }
    return _routeRows;
  }

  @autobind
  public createUserRows(users) {
    let _userRows = [];
    if (users == null) { //run dev case
      for (let i = 0; i < 5; i++) {
        _userRows.push({
          key: i,
          id: 'id' + i,
          username: 'user ' + i,
          email: 'email ' + i,
          permission: 1,
        });
      }
    }
    else { //production case
      for (let i = 0; i < users.length; i++) {
        _userRows.push({
          key: i,
          id: users[i]._id,
          username: users[i].username,
          email: users[i].email,
          permission: users[i].permissionLevel,
        });
      }
    }
    return _userRows;
  }

  @autobind
  public createStopRows(stops) {
    let _stopRows = [];
    if (stops == null) {
      for (let i = 0; i < 5; i++) {
        _stopRows.push({
          key: i,
          id: 'id' + i,
          stopname: 'stop ' + i,
          longitude: 'longitude ' + i,
          latitude: 'latitude ' + i,
          routes: '[1, 2, 4]',
          approved: 'false',
        });
      }
    }
    else {
      for (let i = 0; i < stops.length; i++) {
        _stopRows.push({
          key: i,
          id: stops[i]._id,
          stopname: 'stop ' + i,
          longitude: stops[i].geometry.coordinates[0],
          latitude: stops[i].geometry.coordinates[1],
          routes: stops[i].properties.routes,
          approved: stops[i].properties.approved.toString(),
        });
      }
    }
    return _stopRows;
  }
  @autobind
  private _onChanged(text: any): void {
    if (this.state.screen == 'routes') {
      let dummy = this.createRouteRows(this.state.routes)
      this.setState({ rows: text ? dummy.filter(i => i.routename.toLowerCase().indexOf(text) > -1) : dummy });
    }
    else if (this.state.screen == 'users') {
      let dummy = this.createUserRows(this.state.users)
      this.setState({ rows: text ? dummy.filter(i => i.username.toLowerCase().indexOf(text) > -1) : dummy });
    }
    else if (this.state.screen == 'stops') {
      let dummy = this.createStopRows(this.state.stops)
      this.setState({ rows: text ? dummy.filter(i => i.stopname.toLowerCase().indexOf(text) > -1) : dummy });
    }
  }
  /*--Modal-Screen-Helper-Functions---------------------------------------------*/
  @autobind
  private _onSelect(item: any): void {
    this.selectionScreenContent(this.state.screen, item.key)
    if (this.state.screen == 'routes') {
      this.setState({
        currID: this.state.routes[item.key]._id,
        showModal: true,
      });
    }
    else if (this.state.screen == 'users') {
      this.setState({
        currID: this.state.users[item.key]._id,
        showModal: true,
      });
    }
    else if (this.state.screen == 'stops') {
      this.setState({
        currID: this.state.stops[item.key]._id,
        showModal: true,
      });
    }

  }

  @autobind
  public handleCloseModal() {
    this.setState({ showModal: false });
    this.loadTable(this.state.screen)
  }

  @autobind
  private selectionScreenContent(screen, idx) {
    let screenContent: JSX.Element[] = [];
    if (screen == 'routes' && idx != null) {
      let thisRoute = this.state.routes[idx]
      screenContent.push(<h5> {thisRoute.properties.name} </h5>);
      screenContent.push(<h6> {"Database ID: " + thisRoute._id} </h6>);
      screenContent.push(<Input label={"Cost: " + thisRoute.properties.cost} name="cost" validate />);
      screenContent.push(<Input label={"Duration: " + thisRoute.properties.duration} name="duration" validate />);
      screenContent.push(<Input label={"Notes: " + thisRoute.properties.notes} name="notes" validate />);
      screenContent.push(<h5> {"Approved: " + thisRoute.properties.approved.toString()} </h5>);
      screenContent.push(<div>  <p className="white-text"> Spacing </p> </div>);
      //drop down with days of the week
      screenContent.push(<a className="waves-effect green darken-2 waves-light btn" onClick={() => this.approve(this.state.currID, idx, 'routes')}>Approve</a>);
      screenContent.push(<a className="waves-effect amber darken-2 waves-light btn" onClick={() => this.disapprove(this.state.currID, idx, 'routes')}>Disapprove</a>);
      screenContent.push(<a className="waves-effect red darken-1 waves-light btn" onClick={() => this.deleteEntry(this.state.currID, 'routes')}>Delete</a>);
    }
    else if (screen == 'users') {
      let thisUser = this.state.users[idx]
      screenContent.push(<Input label={"ID: " + thisUser._id} name="ID" validate />);
      screenContent.push(<Input label={"User Name: " + thisUser.username} name="username" validate />);
      screenContent.push(<Input label={"Email: " + thisUser.email} name="email" validate />);
      screenContent.push(<Input label={"Permission Level: " + thisUser.permissionLevel} name="permission" validate />);
      screenContent.push(<a className="waves-effect red waves-light btn" onClick={() => this.deleteEntry(this.state.currID, 'users')}>Delete</a>);
    }
    else if (screen == 'stops') {
      let thisStop = this.state.stops[idx]
      screenContent.push(<Label> {'Stop: ' + idx + '... stop names should be a feature in new backend'} </Label>);
      screenContent.push(<Label> {"Approved: " + thisStop.properties.approved.toString()} </Label>);
      screenContent.push(<Label> {"ID: " + thisStop._id} </Label>);
      screenContent.push(<Label> {"Longitude: " + thisStop.geometry.coordinates[0]} </Label>);
      screenContent.push(<Label> {"Latitude: " + thisStop.geometry.coordinates[1]} </Label>);
      screenContent.push(<Label> {"Associated Routes: " + thisStop.properties.routes.toString()} </Label>);

      screenContent.push(<a className="waves-effect green darken-2 waves-light btn" onClick={() => this.approve(this.state.currID, idx, 'stops')}>Approve</a>);
      screenContent.push(<a className="waves-effect yellow darken-2 waves-light btn" onClick={() => this.disapprove(this.state.currID, idx, 'stops')}>Disapprove</a>);
      screenContent.push(<a className="waves-effect red darken-1 waves-light btn" onClick={() => this.deleteEntry(this.state.currID, 'stops')}>Delete</a>);
    }
    else {
      alert('Modal Call without params')
    }
    this.setState({
      modalScreen: screenContent,
    })
  }

  @autobind
  public approve(id, key, type) {
    let stmt = {}
    if (type == 'routes' || type == 'stops') {
      if (type == 'routes') {
        let routeProp = this.state.routes[key].properties
        stmt = {
          properties: {
            name: routeProp.name,
            cost: routeProp.cost,
            departureTimes: routeProp.departureTimes,
            duration: routeProp.duration,
            notes: routeProp.notes,
            approved: true
          }
        }
      }
      else if (type == 'stops') {
        let stopProp = this.state.stops[key].properties
        stmt = {
          properties: {
            routes: stopProp.routes,
            approved: true
          }
        }
      }
      fetch('api/' + type + '/' + id, {
        method: 'put',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(stmt)
      }).then((res: any) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json()
        }
      }).then(responseJson => {
        //console.log(responseJson);
        if (responseJson.success == false) {
          alert('approve failed... backend error')
        }
        else {
          alert(type + ': approve on ' + id)
          this.handleCloseModal()
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  @autobind
  public disapprove(id, key, type) {
    let stmt = {}
    if (type == 'routes' || type == 'stops') {
      if (type == 'routes') {
        let routeProp = this.state.routes[key].properties
        stmt = {
          properties: {
            name: routeProp.name,
            cost: routeProp.cost,
            departureTimes: routeProp.departureTimes,
            duration: routeProp.duration,
            notes: routeProp.notes,
            approved: false
          }
        }
      }
      else if (type == 'stops') {
        let stopProp = this.state.stops[key].properties
        stmt = {
          properties: {
            routes: stopProp.routes,
            approved: false
          }
        }
      }
      fetch('api/' + type + '/' + id, {
        method: 'put',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(stmt)
      }).then((res: any) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json()
        }
      }).then(responseJson => {
        //console.log(responseJson);
        if (responseJson.success == false) {
          alert('disapprove failed... backend error')
        }
        else {
          alert(type + ': disapprove on ' + id)
          this.handleCloseModal()
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  @autobind
  public editEntry(id, type) {
    alert(type + ': edit on ' + id)
    type = 'test'
    if (type == 'routes' || type == 'users' || type == 'stops') {
      fetch('api/' + type + '/' + id, {
        method: 'put',
        //params for edited body
      }).then((res: any) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json()
        }
      }).then(responseJson => {
        //console.log(responseJson);
        if (responseJson.success == false) {
          alert('delete failed... backend error')
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  @autobind
  public deleteEntry(id, type) {
    alert(type + ': delete on ' + id)
    if (type == 'routes' || type == 'users' || type == 'stops') {
      console.log(type + ' delete', id)
      fetch('api/' + type + '/' + id, {
        method: 'delete',
      }).then((res: any) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json()
        }
      }).then(responseJson => {
        //console.log(responseJson);
        if (responseJson.success == false) {
          alert('delete failed... backend error')
        }
        else {
          this.handleCloseModal()
        }
      }).catch(err => {
        console.log(err);
      });

    }
  }

  @autobind
  public approveSel() {
    let selectionCount = this.state.selectionDetails.length;
    if (selectionCount == 0) {
      alert("No Items are Selected");
    }
    else {
      let selectionEntries = this.state.selectionDetails;
      let dataType = [];
      if (this.state.screen === 'routes') {
        dataType = this.state.routes;
      }
      else if (this.state.screen === 'users') {
        dataType = this.state.users;
      }
      else if (this.state.screen === 'stops') {
        dataType = this.state.stops;
      }
      else {
        alert('No current screen');
        dataType = null;
      }
      if (dataType != null) {
        for (var i = 0; i < selectionCount; i++) {
          for (var j = 0; j < dataType.length; j++) {
            if (selectionEntries[i].id == dataType[j]._id) {
              this.approve(selectionEntries[i].id, j, this.state.screen);
            }
          }
        }
      }
    }
  }

  @autobind
  public disapproveSel() {
    let selectionCount = this.state.selectionDetails.length;
    if (selectionCount == 0) {
      alert("No Items are Selected");
    }
    else {
      let selectionEntries = this.state.selectionDetails;
      let dataType = [];
      if (this.state.screen === 'routes') {
        dataType = this.state.routes;
      }
      else if (this.state.screen === 'users') {
        dataType = this.state.users;
      }
      else if (this.state.screen === 'stops') {
        dataType = this.state.stops;
      }
      else {
        alert('No current screen');
        dataType = null;
      }
      for (var iterator = 0; iterator < selectionCount; iterator++) {
        if (dataType != null) {
          for (var i = 0; i < dataType.length; i++) {
            if (selectionEntries[iterator].id == dataType[i]._id) {
              this.disapprove(selectionEntries[iterator].id, i, this.state.screen);
            }
          }
        }
      }
    }
  }
  @autobind
  public deleteEntrySel() {
    let selectionCount = this.state.selectionDetails.length;
    if (selectionCount == 0) {
      alert("No Items are Selected");
    }
    else {
      for (var iterator = 0; iterator < selectionCount; iterator++) {
        this.deleteEntry(this.state.selectionDetails[iterator].id, this.state.screen);
        console.log("deleted", this.state.selectionDetails[iterator].routename);
      }
    }
  }

  private _getSelectionDetails(): any[] {
    const selectionCount = this._selection.getSelectedCount();
    const selectionInfo = this._selection.getSelection();
    return selectionInfo;
    /*
        //useless
        switch (selectionCount) {
          case 0:
            return 'No items selected';
          case 1:
            return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
          default:
            return `${selectionCount} items selected`;
          }



    */

  }

  /*--Render--------------------------------------------------------------------*/
  public render() {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <h6> Admin Tables </h6>
          <div><CommandButton text='Bus Routes' onClick={() => this.loadTable('routes')} /></div>
          <div><CommandButton text='Users' onClick={() => this.loadTable('users')} /></div>
          <div><CommandButton text='Stops' onClick={() => this.loadTable('stops')} /></div>

          <div>
            <p className="white-text"> Spacing </p>
          </div>

          <div style={{ width: '80%' }}>
            <p> Database Tools </p>
            <div><CommandButton text='Approve Selected' onClick={() => this.approveSel()} /></div>
            <div><CommandButton text='Disapprove Selected' onClick={() => this.disapproveSel()} /></div>
            <div><CommandButton text='Delete Selected' onClick={() => this.deleteEntrySel()} /></div>
          </div>


        </div>

        <div style={styles.table}>
          <TextField
            label='Filter by Name!'
            onChanged={this._onChanged}
          />
          <DetailsList
            items={this.state.rows}
            columns={this.state.columns}
            setKey='set'
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn='Toggle selection'
            ariaLabelForSelectAllCheckbox='Toggle selection for all items'
            onItemInvoked={this._onSelect}
          />
        </div>

        <div style={styles.modal}>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Selection Screen"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnEsc={true}>


            {this.state.modalScreen}
            <a className="waves-effect blue-grey darken-2 waves-light btn" onClick={this.handleCloseModal}>Close[Esc]</a>
          </ReactModal>
        </div>
      </div>
    );
  }
}
/*

*/
