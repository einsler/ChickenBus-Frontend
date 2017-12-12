import * as React from 'react';
import { DataInterface } from './DataInterface';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */
 export interface IDataInterface {

 }

 export interface IDataInterfaceProps extends React.HTMLAttributes<HTMLElement | DataInterface> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IRouteInfo interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IDataInterface) => void;

    /**
     * If set, the RouteInfo will not be able to have its setText method called.
     * This does not affect disabled attribute of any child.
     */
    disabled?: boolean;

    /**
     * Sets the aria-labelledby attribute. Used for accessibility.
     */
    ariaLabelledBy?: string;

    /**
     * Sets the aria-describedby attribute. Used for accessibility.
     */
    ariaDescribedBy?: string;

    //props shared by all components go below ^^^

 }

 export interface IDataInterfaceStyles {

      root?: IStyle;
      header?: IStyle;
      table?: IStyle;
      modal?: IStyle;
      buttonContainer?: IStyle;
 }
