import * as React from 'react';
import {
    IEnterGate,
    IEnterGateProps,
    IEnterGateStyles
} from './EnterGate.Props';
import { BaseComponent, autobind, IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { GoogleMap } from "../GoogleMap/index";
import { getStyles } from './EnterGate.styles'
import { PlaceAutocomplete } from "../PlaceAutocomplete/index";
import { supportedCountries } from "../../MockData/FrontEndConsts";
import { IRouteInfoProps } from "../RouteInfo/index";
import { Button, Row, Card, Input } from 'react-materialize';
import * as csvParse from 'csv-parse';

const styles = getStyles();

interface IEnterGateState {
  route: PlaceAutocomplete[];
  timeInfo?: TimeInfo[];
  routeProperties: IRouteInfoProps;
  showModal?: boolean;
}

export class EnterGate extends BaseComponent<IEnterGateProps, IEnterGateState> {
    private _tripDuration: HTMLInputElement;
    private _cost: HTMLInputElement;
    private _notes: HTMLInputElement;
    private _stopCount: number;
    private _name: HTMLInputElement;
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
        let monday: string[] = [];
        let tuesday: string[] = [];
        let wednesday: string[] = [];
        let thursday: string[] = [];
        let friday: string[] = [];
        let saturday: string[] = [];
        let sunday: string[] = [];
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
            [this._origin].concat(this.state.route).concat([this._destination]).forEach((p, index) => {
                if(!p.getCoords()) {
                    hasGoodLocationData = false;
                    invalidInputs += p.props.title + ' ';
                    this._coords = [];
                    return;
                }
                this._coords.push(p.getCoords());
            });
            if(hasGoodLocationData) {
                let routeToAdd = {
                    name: this._name.value,
                    cost: new Number(this._cost.value).valueOf(),
                    duration: new Number(this._tripDuration.value).valueOf(),
                    notes: this._notes.value,
                    departureTimes: this._createTimesObject()
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

    @autobind
    private _onMapRenderedMarkers() {
        this.setState({
            routeProperties: undefined,
        });
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div className="teal lighten-5" style={styles.form}>
                    <div className="z-depth-1" style={styles.nonFlex}>

                        <div style={styles.input}>
                            <Input ref={ this._resolveRef('_name')} label='Route Name'/>
                        </div>
                    </div>
                    <Card>
                        {[this._origin].concat(this.state.route).concat([this._destination]).map((val) => val.render())}
                        <div style={styles.enterButtonBox}>
                            <div style={{margin: "5px"}}>
                                <Button floating icon="add" onClick={this.addStop}>Add Stop</Button>
                            </div>
                            <div style={{margin: "5px"}}>
                                <Button floating className="red" icon="remove" onClick={this.removeStop}>Remove Stop</Button>
                            </div>
                        </div>
                    </Card>

                    <div>
                        <div className="z-depth-1" style={styles.nonFlex}>
                            <div style={styles.input}>
                                <Input ref = {this._resolveRef('_tripDuration')} label= 'Duration'/>
                            </div>
                            <div style={styles.enterButtonBox}>
                                <Button flat onClick={()=>this.setState({showModal: true})}>Add Pickup Times</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{...styles.flex, justifyContent: 'center'}}>
                        <Modal isOpen={this.state.showModal} onDismiss={(() => {this.setState({showModal: false})})}>
                            <div style={{ maxHeight: '60vh', overflowY: 'auto', justifyContent: 'center'}}>
                                { console.log(this.state.timeInfo)}
                                {this.state.timeInfo.map((info, index)=><TimePicker {...info} index={index} onInfoChange={this.onTimesUpdated}/>)}
                            </div>
                            <div style={styles.enterButtonBox}>
                                <div style={{margin: "5px"}}>
                                    <Button flat onClick={()=>this.setState({timeInfo: this.state.timeInfo.concat([{time: this.state.timeInfo[this.state.timeInfo.length-1].time}])})}>Add Time</Button>
                                </div>
                                <div style={{margin: "5px"}}>
                                    <Button flat onClick={()=>{if(this.state.timeInfo.length > 1) this.setState({timeInfo: this.state.timeInfo.slice(0,this.state.timeInfo.length-1)})}}>Remove Time</Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <div className="z-depth-1" style={styles.nonFlex}>
                        <div style={styles.input}>
                            <Input ref = {this._resolveRef('_cost')} label= 'Cost'/>
                        </div>
                    </div>
                    <div className="z-depth-1" style={styles.nonFlex}>
                        <div style={styles.input}>
                            <Input label={"Notes"} ref = {this._resolveRef('_notes')}/>
                        </div>
                    </div>
                    <div style={ styles.enterButtonBox}>
                        <div className="white z-depth-1" style={{margin: "5px"}}>
                            <Button flat onClick={this._previewRoute}>Preview Route</Button>
                        </div>
                        <div className="white z-depth-1" style={{margin: "5px"}}>
                            <Button flat onClick={this._addRoute}>Add Route</Button>
                        </div>
                    </div>
                    <Card>
                        <Input id='csv' type='file' accept='.csv'/>
                        <div style={styles.enterButtonBox}>
                            <Button onClick={this._parseCSV}>Bulk Submit</Button>
                        </div>
                    </Card>
                </div>
                <div style={ styles.googleMap }>
                    <GoogleMap locationCoords={ this._coords } routeProperties={ this.state.routeProperties } onDidRenderNewLocations={this._onMapRenderedMarkers}/>
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

/**
 * Time picker stateless component for adding times for busses. 
 * Note: there is currently a bug with the Materialize React Input component we use.
 * Right now it doesn't show up as being checked when passed in a 'checked' value for default value. This case is caused when
 * a user checks one of the boxes and then adds a new time. The newly added TimePicker should mirror the TimePicker above it.
 * Will need to open a ticket up on the materialize react page (which seems to be dead - RIP) or find a work around.
 * 
 * For now I've disabled using the previous TimePickers value.
 * To reenable this replace the contents of the concat statement in the onClick of the Add Time button with
 * [this.state.timeInfo[this.state.timeInfo.length-1]]
 * instead of using 
 * [{time: this.state.timeInfo[this.state.timeInfo.length-1].time}]
 * @param props 
 */

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
    let _monday: Input;
    let _tuesday: Input;
    let _wednesday: Input;
    let _thursday: Input;
    let _friday: Input;
    let _saturday: Input;
    let _sunday: Input;

    return(
        <div style={{display: "flex", margin: "5px", justifyContent: "center",alignContent: "center"}} >
            <input style={{margin: "5px", width: '125px'}} type="time" defaultValue={_info.time} ref={(input) => _time = input} onChangeCapture={() => {_info.time = _time.value;props.onInfoChange(props.index, _info);}}/>
            <Row style={{marginTop: '15px'}}>
                <Input type="checkbox" label={ 'Monday' } defaultValue={props.monday ? 'checked' : null} ref={(input) => _monday = input} onChange={() => { _info.monday = !_info.monday;_monday.checked = _info.monday; props.onInfoChange(props.index, _info)}}/>
                <Input type="checkbox" label={ 'Tuesday' } defaultValue={props.tuesday ? 'checked' : null} ref={(input) => _tuesday = input} onChange={() => {_info.tuesday = !_info.tuesday;_tuesday.checked = _info.tuesday;props.onInfoChange(props.index, _info)}}/>
                <Input type="checkbox" label={ 'Wednesday' } defaultValue={props.wednesday ? 'checked' : null} ref={(input) => _wednesday = input} onChange={() => {_info.wednesday = !_info.wednesday;_wednesday.checked = _info.wednesday;props.onInfoChange(props.index, _info)}}/>
                <Input type="checkbox" label={ 'Thursday' } defaultValue={props.thursday ? 'checked' : null} ref={(input) => _thursday = input} onChange={() => {_info.thursday = !_info.thursday;_thursday.checked = _info.thursday;props.onInfoChange(props.index, _info)}}/>
                <Input type="checkbox" label={ 'Friday' } defaultValue={props.friday ? 'checked' : null} ref={(input) => _friday = input} onChange={() => {_info.friday = !_info.friday;_friday.checked = _info.friday;props.onInfoChange(props.index, _info)}}/>
                <Input type="checkbox" label={ 'Saturday' } defaultValue={props.saturday ? 'checked' : null} ref={(input) => _saturday = input} onChange={() => {_info.saturday = !_info.saturday;_saturday.checked = _info.saturday;props.onInfoChange(props.index, _info)}}/>
                <Input type="checkbox" label={ 'Sunday' } defaultValue={props.sunday ? 'checked' : null} ref={(input) => _sunday = input} onChange={() => {_info.sunday = !_info.sunday;_sunday.checked = _info.sunday;props.onInfoChange(props.index, _info)}}/>
            </Row>
        </div>
        )
}
