import * as React from 'react';
import { RouteInfo } from './RouteInfo';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */
 export interface IRouteInfo {

 }

 export interface IRouteInfoProps extends React.HTMLAttributes<HTMLElement | RouteInfo> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IRouteInfo interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IRouteInfo) => void;

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

    // End of props shared by all components.

    /**
     * The title of the route to be displayed
     */
    name: string;

    /**
     * The duration of the route to be displayed
     */
    duration?: number;

    /**
     * The cost of the route to be displayed
     */
    cost?: number;

    /**
     * Any additional notes about the route that should be shown.
     */
    notes?: string;

    /**
     * All times associated with the route.
     */
     departureTimes?: {
         sunday: number[],
         monday: number[],
         tuesday: number[],
         wednesday: number[],
         thursday: number[],
         friday: number[],
         saturday: number[]
     }
 }

 export interface IRouteInfoStyles {
     /**
      * Style for the root element that will contain the title and text.
      */
      root?: IStyle;

    /**
     * Containing div for displayed information.
     */
    infoContainer?: IStyle;

      /**
       * Style for the title of the RouteInfo component.
       */
      title?: IStyle;

      /**
       * Style for the text of the RouteInfo component.
       */
      text?: IStyle;
 }
