import * as React from 'react';
import {
    IEnterGate,
    IEnterGateProps,
    IEnterGateStyles
} from './EnterGate.Props';
import { BaseComponent, autobind, IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { CommandButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { GoogleMap } from "../GoogleMap/index";
import { getStyles } from './EnterGate.styles'
import { PlaceAutocomplete } from "../PlaceAutocomplete/index";
import { supportedCountries } from "../../MockData/FrontEndConsts";
import { IRouteInfoProps } from "../RouteInfo/index";
import * as csvParse from 'csv-parse';

const styles = getStyles();

interface IEnterGateState {
  route: PlaceAutocomplete[];
  timeInfo?: TimeInfo[];
  routeProperties: IRouteInfoProps;
  showModal?: boolean;
}

export class EnterGate extends BaseComponent<IEnterGateProps, IEnterGateState> {
    private _tripDuration: TextField;
    private _cost: TextField;
    private _notes: TextField;
    private _stopCount: number;
    private _name: TextField;
    private _coords: google.maps.LatLng[];
    private _origin: PlaceAutocomplete;
    private _destination: PlaceAutocomplete;
    
    constructor(props: IEnterGateProps) {
        super(props);
        this._stopCount= 0;
        this._origin = new PlaceAutocomplete({title: "Origin"});
        this._destination = new PlaceAutocomplete({title: "Destination"})
        this.state = {
            timeInfo: [{}],
            route: [],
            routeProperties: undefined
        }
    }

    @autobind
    private onTimesUpdated(index: number, info: TimeInfo) {
        let temp = this.state.timeInfo;
        temp[index] = info;
        this.setState({timeInfo: temp});
        
    }

    @autobind
    private addStop(): void{
        this._stopCount++;
        let temp: PlaceAutocomplete[] = this.state.route;
        temp.push(new PlaceAutocomplete({title: "Stop "+ this._stopCount}));
        this._coords = [];
        this.setState({
            route: temp,
            routeProperties: undefined
        })
    }

    @autobind
    private removeStop(): void {
        if(this.state.route.length > 0) {
            this._stopCount--;
            let temp: PlaceAutocomplete[] = this.state.route.slice(0,this.state.route.length-1);
            this._coords = [];
            this.setState({
                route: temp,
                routeProperties: undefined
            });
        }
    }

    @autobind
    private _createTimesObject() {
        let monday: number[] = [];
        let tuesday: number[] = [];
        let wednesday: number[] = [];
        let thursday: number[] = [];
        let friday: number[] = [];
        let saturday: number[] = [];
        let sunday: number[] = [];
        this.state.timeInfo.map((info)=>{
            if(info.monday) {
                monday.push(info.time);
            }
            if(info.tuesday) {
                tuesday.push(info.time);
            }
            if(info.wednesday) {
                wednesday.push(info.time);
            }
            if(info.thursday) {
                thursday.push(info.time);
            }
            if(info.friday) {
                friday.push(info.time);
            }
            if(info.saturday) {
                saturday.push(info.time);
            }
            if(info.sunday) {
                sunday.push(info.time);
            }
        })
        return {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
        }
    }

    @autobind
    private generateStops(storeRoute: boolean) {
            let hasGoodLocationData: boolean = true;
            let invalidInputs: string = '';
            this._coords = [];
            this.state.route.forEach((p, index) => {
                if(!p.getCoords()) {
                    hasGoodLocationData = false;
                    invalidInputs += p.props.title + ' ';
                    this._coords = [];
                    return;
                }
                this._coords.push(p.getCoords());
            });
            if(hasGoodLocationData && this.state.route.length > 1) {
                let routeToAdd = {
                    name: this._name.value,
                    cost: new Number(this._cost.value).valueOf(),
                    duration: new Number(this._tripDuration.value).valueOf(),
                    notes: this._notes.value,
                    times: this._createTimesObject()
                }
                if(storeRoute) {
                    this.setState({
                        routeProperties: routeToAdd,
                    });                   
                } else {
                    this.setState({
                        routeProperties: undefined,
                    });
                }
            }else if(this.state.route.length <= 1){
                alert("Only one stop was added! Add more to create a valid route!");
            }else {
                alert("Check your location value for " + invalidInputs);  
            }
        };

    @autobind
    private _addRoute(): void{
        this.generateStops(true);

    }

    @autobind
    private _previewRoute(): void{
        this.generateStops(false);
    }
    @autobind
    private _parseCSV(): void{
        let file = (document.getElementById('csv') as HTMLInputElement).files[0];
        let reader = new FileReader();
        let csv: string = '';
        reader.onload = (e) => {
            csv = reader.result;
            csvParse(csv, {columns: true}, function(err: any, output: any){
                if(err){
                    console.log(err);
                }else if(output){
                    // console.log(JSON.stringify(output));
                    fetch('/api/routes/csv', {
                        method: 'post',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify(output)
                    }).then((res: any)=> res.json())
                    alert("Routes added.");
                }
            })
        }
        reader.readAsBinaryString(file);
    }   

    public render() {
        return(
            <div style={ styles.root }>
                <div style={styles.form}>
                    <Label> Name </Label>
                    <TextField componentRef= { this._resolveRef('_name')} placeholder= 'Enter name of Route here'/>
                    <Label> Stops </Label>
                    {[this._origin].concat(this.state.route).concat([this._destination]).map((val) => val.render())}
                    <div style={styles.enterButtonBox}>
                        <CommandButton iconProps={{iconName: 'Add'}} text={ "Add Stop" } onClick={this.addStop}/>
                        <CommandButton iconProps={{iconName: 'SkypeMinus'}} text={ "Remove Stop" } onClick={this.removeStop}/>
                    </div>
                    <div style={styles.times}>
                        <div style={styles.flex}>
                            <div style={styles.label}>
                                <Label> Trip Duration</Label>
                            </div>
                            <div style={styles.input}>
                                <TextField componentRef = {this._resolveRef('_tripDuration')} placeholder= 'Enter duration in minutes'/>
                            </div>
                        </div>
                    </div>
                    <div style={{...styles.flex, justifyContent: 'center'}}>
                        <CommandButton text={"Add Pickup Times"} onClick={()=>this.setState({showModal: true})}/>
                        <Modal isOpen={this.state.showModal} onDismiss={(() => {this.setState({showModal: false})})}>
                            <div style={{justifyContent: 'center'}}>
                                {this.state.timeInfo.map((info, index)=><TimePicker {...info} index={index} onInfoChange={this.onTimesUpdated}/>)}
                            </div>
                            <div style={{display: "flex", margin: "10px"}}>
                                <DefaultButton text={"Add Time"} onClick={()=>this.setState({timeInfo: this.state.timeInfo.concat([this.state.timeInfo[this.state.timeInfo.length-1]])})}/>
                                <DefaultButton text={"Remove Time"} onClick={()=>{if(this.state.timeInfo.length > 1) this.setState({timeInfo: this.state.timeInfo.slice(0,this.state.timeInfo.length-1)})}}/>
                            </div>
                        </Modal> 
                    </div>
                    <div style={styles.flex}>
                        <div style={styles.label}>
                            <Label>Cost</Label>
                        </div>
                        <div style={styles.input}>
                            <TextField componentRef = {this._resolveRef('_cost')} placeholder= 'Enter cost in dollars'/>
                        </div>
                    </div>
                    <TextField componentRef = {this._resolveRef('_notes')} label='Notes' multiline rows={ 5 }/>
                    <div style={ styles.enterButtonBox }>
                        <CommandButton text='Preview Route' onClick={this._previewRoute}/>
                        <CommandButton text='Add Route' onClick={this._addRoute}/>
                    </div>
                    <div>
                        <input id='csv' type='file' accept='.csv'/>
                        <CommandButton text='Submit' onClick={this._parseCSV}/>
                    </div>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap locationCoords={ this._coords } routeProperties={ this.state.routeProperties }/>
                </div>
            </div>
        )
    }
}

interface TimeInfo {
    time?: any;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
}

interface ITimePickerProps extends IBaseProps, TimeInfo {
    index: number;
    onInfoChange: (index: number, newState:TimeInfo) => void;
}

const TimePicker: React.StatelessComponent<ITimePickerProps> = (props: ITimePickerProps) => {
    let _time: HTMLInputElement;
    let _info: TimeInfo = {
        time: props.time,
        monday: props.monday,
        tuesday: props.tuesday,
        wednesday: props.wednesday,
        thursday: props.thursday,
        friday: props.friday,
        saturday: props.saturday,
        sunday: props.sunday
    }
    let _monday: HTMLInputElement;
    let _tuesday: HTMLInputElement;
    let _wednesday: HTMLInputElement;
    let _thursday: HTMLInputElement;
    let _friday: HTMLInputElement;
    let _saturday: HTMLInputElement;
    let _sunday: HTMLInputElement;

    return(
        <div style={{display: "flex", margin: "5px", alignContent: "center"}} >
            <input style={{margin: "5px"}} type="time" defaultValue={_info.time} ref={(input) => _time = input} onChangeCapture={() => {_info.time = _time.value;props.onInfoChange(props.index, _info);}}/>
                <input style={{margin: "5px"}} type="radio" defaultChecked={props.monday} ref={(input) => _monday = input} onClick={() => { _info.monday = !_info.monday;_monday.checked = _info.monday; props.onInfoChange(props.index, _info)}}/>
                <input style={{margin: "5px"}} type="radio" defaultChecked={props.tuesday} ref={(input) => _tuesday = input} onClick={() => {_info.tuesday = !_info.tuesday;_tuesday.checked = _info.tuesday;props.onInfoChange(props.index, _info)}}/>
                <input style={{margin: "5px"}} type="radio" defaultChecked={props.wednesday} ref={(input) => _wednesday = input} onClick={() => {_info.wednesday = !_info.wednesday;_wednesday.checked = _info.wednesday;props.onInfoChange(props.index, _info)}}/>
                <input style={{margin: "5px"}} type="radio" defaultChecked={props.thursday} ref={(input) => _thursday = input} onClick={() => {_info.thursday = !_info.thursday;_thursday.checked = _info.thursday;props.onInfoChange(props.index, _info)}}/>
                <input style={{margin: "5px"}} type="radio" defaultChecked={props.friday} ref={(input) => _friday = input} onClick={() => {_info.friday = !_info.friday;_friday.checked = _info.friday;props.onInfoChange(props.index, _info)}}/>
                <input style={{margin: "5px"}} type="radio" defaultChecked={props.saturday} ref={(input) => _saturday = input} onClick={() => {_info.saturday = !_info.saturday;_saturday.checked = _info.saturday;props.onInfoChange(props.index, _info)}}/>
                <input style={{margin: "5px"}} type="radio" defaultChecked={props.sunday} ref={(input) => _sunday = input} onClick={() => {_info.sunday = !_info.sunday;_sunday.checked = _info.sunday;props.onInfoChange(props.index, _info)}}/>
            </div>
        )
}