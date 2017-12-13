import * as React from 'react';
import {
    IDataInterface,
    IDataInterfaceProps,
    IDataInterfaceStyles
} from './DataInterface.Props';
import * as ReactModal from 'react-modal';
import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import { TextField } from "office-ui-fabric-react/lib/components/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from "office-ui-fabric-react/lib/components/DetailsList";
import { Modal } from "office-ui-fabric-react/lib/components/Modal";
import { getStyles } from "./DataInterface.styles";

const styles = getStyles();

/*--Constants/Frameworks for Table Column Build-------------------------------*/
const routeColumns: IColumn[] = [
  { key: 'column1', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for id'},
  { key: 'column2', name: 'Route Name', fieldName: 'routename', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for routename'},
  //{ key: 'column3', name: 'Duration', fieldName: 'duration', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for duration'},
  //{ key: 'column4', name: 'Departure Times', fieldName: 'departuretimes', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for durationtimes'},
  //{ key: 'column5', name: 'Cost', fieldName: 'cost', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for cost'},
  { key: 'column6', name: 'Notes', fieldName: 'notes', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for notes'},
  { key: 'column7', name: 'Approved', fieldName: 'approved', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for approved'},
];

let userColumns: IColumn[] = [
  { key: 'column1', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for id'},
  { key: 'column2', name: 'User Name', fieldName: 'username', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for username'},
  { key: 'column3', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for email'},
  { key: 'column4', name: 'Permission Level', fieldName: 'permission', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for permission'},
];

let stopColumns: IColumn[] = [
  { key: 'column1', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for id'},
  { key: 'column2', name: 'Stop Name', fieldName: 'stopname', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for stopname'},
  { key: 'column3', name: 'Longitude', fieldName: 'longitude', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for longitide'},
  { key: 'column4', name: 'Latitude', fieldName: 'latitude', minWidth: 100, maxWidth: 200, isResizable: true, ariaLabel: 'Operations for latitude'},
];

interface IDataInterfaceState {
  routes: any[], users: any[], stops: any [],
  rows: any[], columns: any[],

  showModal: any,
  currID: string,
  screen: string,

  modalScreen?: JSX.Element[];
}


export class DataInterface extends BaseComponent< IDataInterfaceProps, IDataInterfaceState> {
  private routeRows: any[];
  private userRows: any[];
  private stopRows: any[];
  private _selection: Selection;

  constructor(props: IDataInterfaceProps) {
    super(props);
    this.state = {
      routes: [], users: [], stops: [],
      rows: [], columns: [],
      showModal: false,
      currID: '',
      screen: '',
    };
  }

/*--Initialization------------------------------------------------------------*/
  public componentWillMount(){
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
      return result.json(); }).then(result => {
        let info = result.data
        if (info.length) { //successful data fetch
          if( lever == 'routes' ){
            that.setState({
              screen: 'routes',
              routes: info,
            });
            rows = that.createRouteRows(info);
            columns = routeColumns;
          }
          else if( lever == 'users' ){
            that.setState({
              screen: 'users',
              users: info,
            });
            rows = that.createUserRows(info);
            columns = userColumns
          }
          else if( lever == 'stops' ){
            that.setState({
              screen: 'stops',
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
      }).catch(err => { //failed, run dev case
        console.log(err)
        if( lever == 'routes' ){
          rows = that.createRouteRows(null);
          that.setState({
            screen: 'routes',
            routes: rows,
          });
          columns = routeColumns;
        }
        else if( lever == 'users' ){
          rows = that.createUserRows(null);
          that.setState({
            screen: 'users',
            users: rows,
          });
          columns = userColumns
        }
        else if( lever == 'stops' ){
          rows = that.createUserRows(null);
          that.setState({
            screen: 'stops',
            stops: rows,
          });
          columns = stopColumns
        }
        else{}
        that.setState({
          rows: rows,
          columns: columns
          });
      });
  }

  @autobind
  public createRouteRows(routes) {
    let _routeRows = [];
    if(routes == null){ //dev case
      console.log('testing case -- npm run dev')
      for (let i = 0; i < 27; i++) {
        _routeRows.push({
          key: i,
          id: 'id' + i,
          routename: 'route '+i,
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
    console.log(' ')
    return _routeRows;
  }

  @autobind
  public createUserRows(users) {
    let _userRows = [];
    if(users == null){ //run dev case
      for (let i = 0; i < 5; i++) {
        _userRows.push({
          key: i,
          id: 'id' + i,
          username: 'user ' + i,
          email: 'email '+ i,
          permission: 1,
        });
      }
    }
    else{ //production case
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
    if (stops == null){
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
    else{
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

    if(this.state.screen == 'routes'){
      let dummy = this.createRouteRows(this.state.routes)
      this.setState({ rows: text ? dummy.filter(i => i.routename.toLowerCase().indexOf(text) > -1) : dummy });
    }
    else if(this.state.screen == 'users'){
      let dummy = this.createUserRows(this.state.users)
      this.setState({ rows: text ? dummy.filter(i => i.username.toLowerCase().indexOf(text) > -1) : dummy });
    }
    else if(this.state.screen == 'stops'){
      let dummy = this.createStopRows(this.state.stops)
      this.setState({ rows: text ? dummy.filter(i => i.stopname.toLowerCase().indexOf(text) > -1) : dummy });
    }
  }
/*--Modal-Screen-Helper-Functions---------------------------------------------*/
  @autobind
  private _onSelect(item: any): void {
    this.selectionScreenContent(this.state.screen, item.key)
    if(this.state.screen == 'routes'){
      this.setState({
        currID: this.state.routes[item.key]._id,
        showModal: true,
      });
    }
    else if(this.state.screen == 'users'){
      this.setState({
        currID: this.state.users[item.key]._id,
        showModal: true,
      });
    }
    else if(this.state.screen == 'stops'){
      this.setState({
        currID: this.state.stops[item.key]._id,
        showModal: true,
      });
    }

  }

  @autobind
  public handleCloseModal () {
    this.setState({ showModal: false });
    this.loadTable(this.state.screen)
  }

  @autobind
  private selectionScreenContent(screen, idx){
    let screenContent: JSX.Element[] = [];
    if (screen == 'routes' && idx != null){
      let thisRoute = this.state.routes[idx]
      screenContent.push(<TextField label = 'ID: ' underlined placeholder= {thisRoute._id}/>);
      screenContent.push(<TextField label = 'Route Name: ' underlined placeholder= {thisRoute.properties.name}/>);
      //drop down with days of the week

      // <GroupedList
      //   ref='groupedList'
      //   items={ _items }
      //   onRenderCell={ this._onRenderCell }
      //   groupProps={
      //     {
      //       onRenderHeader: this._onRenderHeader,
      //       onRenderFooter: this._onRenderFooter
      //     }
      //   }
      //   groups={ _groups }
      // />

      //screenContent.push(<TextField label = 'Departure Times: ' underlined placeholder= {thisRoute.properties.departureTimes.saturday[0]}/>);
      screenContent.push(<TextField label = 'Cost: ' underlined placeholder= {thisRoute.properties.cost}/>);
      screenContent.push(<TextField label = 'Duration: ' underlined placeholder= {thisRoute.properties.duration}/>);
      screenContent.push(<TextField label = 'Notes: ' underlined placeholder= {thisRoute.properties.notes}/>);
      //pinwheel for edit
      screenContent.push(<TextField label = 'Approved: ' underlined placeholder= {thisRoute.properties.approved.toString()}/>);
      //screenContent.push(<TextField componentRef = {this._resolveRef('id')} placeholder= 'Enter cost in dollars'/>);

      screenContent.push(<CommandButton text='Approve' onClick={() => this.approve(this.state.currID, idx, 'routes')}/>);
      //screenContent.push(<CommandButton text='Edit' onClick={() => this.editEntry(this.state.currID, 'routes')}/>);
      screenContent.push(<CommandButton text='Delete' onClick={() => this.deleteEntry(this.state.currID, 'routes')}/>);
    }
    else if (screen == 'users'){
      let thisUser = this.state.users[idx]
      screenContent.push(<TextField label = 'ID: ' underlined placeholder= {thisUser._id}/>);
      screenContent.push(<TextField label = 'User Name: ' underlined placeholder= {thisUser.username}/>);
      screenContent.push(<TextField label = 'Email: ' underlined placeholder= {thisUser.email}/>);
      screenContent.push(<TextField label = 'Permission Level: ' underlined placeholder= {thisUser.permissionLevel}/>);

      //screenContent.push(<CommandButton text='Edit' onClick={() => this.editEntry(this.state.currID, 'users')}/>);
      screenContent.push(<CommandButton text='Delete' onClick={() => this.deleteEntry(this.state.currID, 'users')}/>);
    }
    else if (screen == 'stops'){
      let thisStop = this.state.stops[idx]
      screenContent.push(<TextField label = 'ID: ' underlined placeholder= {thisStop._id}/>);
      screenContent.push(<TextField label = 'Stop Name: ' underlined placeholder= {'stop'+idx} />);
      screenContent.push(<TextField label = 'Longitude: ' underlined placeholder= {thisStop.geometry.coordinates[0]}/>);
      screenContent.push(<TextField label = 'Latitude: ' underlined placeholder= {thisStop.geometry.coordinates[1]}/>);
      screenContent.push(<TextField label = 'Associated Routes: ' underlined placeholder= {thisStop.properties.routes[0]}/>);
      screenContent.push(<TextField label = 'Approved: ' underlined placeholder= {thisStop.properties.approved.toString()}/>);

      screenContent.push(<CommandButton text='Approve' onClick={() => this.approve(this.state.currID, idx, 'stops')}/>);
      //screenContent.push(<CommandButton text='Edit' onClick={() => this.editEntry(this.state.currID, 'stops')}/>);
      screenContent.push(<CommandButton text='Delete' onClick={() => this.deleteEntry(this.state.currID, 'stops')}/>);
    }
    else{
      alert('Modal Call without params')
    }
    this.setState({
        modalScreen: screenContent,
    })
  }

  @autobind
  public approve(id, key, type){
    let stmt = {}
    if(type == 'routes' || type == 'stops'){
      if(type == 'routes'){
        let routeProp = this.state.routes[key].properties
        stmt = {
          properties:{
            name: routeProp.name,
            cost: routeProp.cost,
            departureTimes: routeProp.departureTimes,
            duration: routeProp.duration,
            notes: routeProp.notes,
            approved: true
          }
        }
      }
      else{
        let stopProp = this.state.stops[key].properties
        let stmt = {
          properties:{
            routes: stopProp.routes,
            approved: true
          }
        }
      }
      fetch('api/'+type+'/'+id, {
          method: 'put',
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify(stmt)
        }).then((res: any) => {
            if(!res.ok){
                throw Error(res.statusText);
            }else{
                return res.json()
            }
        }).then(responseJson => {
            console.log(responseJson);
            if(responseJson.success == false){
              alert('approve failed... backen error')
            }
            else{
              this.handleCloseModal
            }
        }).catch(err => {
            console.log(err);
        });

      alert(type+ ': approve on ' + id)

    }
  }

  @autobind
  public editEntry(id, type){
    alert(type+ ': edit on ' + id)
    type = 'test'
    if(type == 'routes' || type == 'users' || type == 'stops'){
      fetch('api/'+type+'/'+id, {
          method: 'put',
          //params for edited body
        }).then((res: any) => {
            if(!res.ok){
                throw Error(res.statusText);
            }else{
                return res.json()
            }
        }).then(responseJson => {
            console.log(responseJson);
            if(responseJson.success == false){
              alert('delete failed... backend error')
            }
        }).catch(err => {
            console.log(err);
        });
    }
  }

  @autobind
  public deleteEntry(id, type){
    alert(type+ ': delete on ' + id)
    if(type == 'routes' || type == 'users' || type == 'stops'){
      console.log(type + ' delete', id)
      fetch('api/'+type+'/'+id, {
          method: 'delete',
        }).then((res: any) => {
            if(!res.ok){
                throw Error(res.statusText);
            }else{
                return res.json()
            }
        }).then(responseJson => {
            console.log(responseJson);
            if(responseJson.success == false){
              alert('delete failed... backend error')
            }
            else{
              this.handleCloseModal
            }
        }).catch(err => {
            console.log(err);
        });

    }
  }
/*--Render--------------------------------------------------------------------*/
  public render() {
    return (
      <div style={ styles.root }>
          <div style={styles.header}>
            <div><CommandButton text='Bus Routes' onClick={() => this.loadTable('routes')}/></div>
            <div><CommandButton text='Users' onClick={() => this.loadTable('users')}/></div>
            <div><CommandButton text='Stops' onClick={() => this.loadTable('stops')}/></div>
          </div>

          <div style={styles.table}>
            <TextField
              label='Filter by name:'
              onChanged={ this._onChanged }
              />
            <DetailsList
              items={ this.state.rows }
              columns={ this.state.columns }
              setKey='set'
              layoutMode={ DetailsListLayoutMode.fixedColumns }
              selection={ this._selection }
              selectionPreservedOnEmptyClick={ true }
              ariaLabelForSelectionColumn='Toggle selection'
              ariaLabelForSelectAllCheckbox='Toggle selection for all items'
              onItemInvoked={ this._onSelect }
            />
          </div>

          <div style={styles.modal}>
            <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Selection Screen"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnEsc={true}>

              <Label>Select Screen</Label>
              {this.state.modalScreen}
              <CommandButton text='Close [Esc]' onClick={this.handleCloseModal} />

            </ReactModal>
          </div>
      </div>
    );
  }
}
