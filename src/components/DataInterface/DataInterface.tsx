import {
    IDataInterface,
    IDataInterfaceProps,
    IDataInterfaceStyles
} from './DataInterface.Props';
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { getStyles } from "./DataInterface.styles";

//READ
//CREATE
//EDIT
//DELETE

const styles = getStyles();
interface IDataInterfaceState {
  showRoute: boolean;
}
export class DataInterface extends BaseComponent<IDataInterfaceProps, IDataInterfaceState> {
    constructor(props: IDataInterfaceProps) {
        super(props);
        this.state = {}
    }


    loadRoutes() {
    }

    async componentDidMount(){
      this.loadRoutes();
    }

    editRoute() {
    }

    deleteRoute() {
    }

    public render() {
        return(
          //bootstrap accordion
          <div style={ styles.root }>
            <h1>Routes</h1>

          </div>
        )
    }
}
