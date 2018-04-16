import {
  IRouteInfo,
  IRouteInfoProps,
  IRouteInfoStyles,
} from './RouteInfo.Props';

import { BaseComponent, autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { getStyles } from "./RouteInfo.styles";
import { Card, Collapsible, CollapsibleItem, Tab, Tabs } from "react-materialize";
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/components/Pivot';

interface IRouteInfoState {
  timeMon?: JSX.Element;
  timeTues?: JSX.Element;
  timeWed?: JSX.Element;
  timeThurs?: JSX.Element;
  timeFri?: JSX.Element;
  timeSat?: JSX.Element;
  timeSun?: JSX.Element;
}

const styles = getStyles();

export class RouteInfo extends BaseComponent<IRouteInfoProps, IRouteInfoState> {

  constructor(props: IRouteInfoProps) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    ($('.collapsible') as any).collapsible();
  }

  public render() {
    return (
      <div>
      <Collapsible className="z-depth-0" accordion>
        <CollapsibleItem header={
          <div>
            <div style={styles.infoContainer}>
              <p style={styles.name}> {this.props.name} </p>
              <p style={styles.time}> {this.props.duration} Minutes </p>
            </div>
            <div style={styles.infoContainer}>
              <p style={styles.notes}> {this.props.notes} </p>
              <p style={styles.cost}> C${this.props.cost} </p>
            </div>
          </div>
        }>
        <div style={{ padding: '1 rem'}}>
        <p> Departure Times</p>
          <Collapsible className="z-depth-0" accordion>
            <CollapsibleItem header='Monday'>
              <div style={{ overflowY: 'scroll' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                {this.props.departureTimes.monday}
              </div>
            </div>
            </CollapsibleItem>
            <CollapsibleItem header='Tuesday'>
              <div style={{ overflowY: 'scroll' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  {this.props.departureTimes.tuesday}
                </div>
              </div>
            </CollapsibleItem>

            <CollapsibleItem header='Wednesday'>
              <div style={{ overflow: 'scroll' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  {this.props.departureTimes.wednesday}
                </div>
              </div>
            </CollapsibleItem>

            <CollapsibleItem header='Thursday'>
              <div style={{ overflow: 'scroll' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  {this.props.departureTimes.thursday}
                </div>
              </div>

            </CollapsibleItem>
            <CollapsibleItem header='Friday'>
              <div style={{ overflow: 'scroll' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  {this.props.departureTimes.friday}
                </div>
              </div>

            </CollapsibleItem>
            <CollapsibleItem header='Saturday'>
              <div style={{ overflow: 'scroll' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  {this.props.departureTimes.saturday}
                </div>
              </div>
            </CollapsibleItem>

            <CollapsibleItem header='Sunday'>
              <div style={{ overflow: 'scroll' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  {this.props.departureTimes.sunday}
                </div>
              </div>
            </CollapsibleItem>
          </Collapsible>
          </div>
        </CollapsibleItem>
      </Collapsible>
      </div>
    )
  }
  /*
  private renderTimes(times: String[]): JSX.Element {
    const t1 = times[0].split(',').slice(0, times[0].split(',').length / 3);
    const t2 = times[0].split(',').slice(times[0].split(',').length / 3, 2 * times[0].split(',').length / 3);
    const t3 = times[0].split(',').slice(2 * times[0].split(',').length / 3, times[0].split(',').length);

    return (
      <div style={styles.timeContainer}>
        <div style={{ margin: '10px' }}>
          <p> label</p>
          {t1.map((time) => <p>{time}</p>)}
        </div>

        <div style={{ margin: '10px' }}>
          {t2.map((time) => <p>{time}</p>)}
        </div>

        <div style={{ margin: '10px' }}>
          {t3.map((time) => <p>{time}</p>)}
        </div>
      </div>
    );

  }
*/
  public componentWillReceiveProps() {
    this.forceUpdate();
  }

}
