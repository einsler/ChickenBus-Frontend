import * as React from 'react';
import { EnterGate } from './EnterGate';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface IEnterGate {

 }

 export interface IEnterGateProps extends React.HTMLAttributes<HTMLBaseElement | EnterGate> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IBasePage interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IEnterGate) => void;

    // End of props shared by all components.

    content?: JSX.Element;

    /**
     * The optional custom styling to be applied to the BasePage component.
     */
    styles?: IEnterGateStyles;
 }
  export interface IEnterGateStyles {
     root: IStyle;
     entryPanel: IStyle;
     enterButtonBox: IStyle;
     googleMap: IStyle;
     form: IStyle;
     flex: IStyle;
     input: IStyle;
     label: IStyle;
  }
