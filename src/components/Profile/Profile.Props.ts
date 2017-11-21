import * as React from 'react';
import { Profile } from './Profile';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */
 export interface IProfile {

 }

 export interface IProfileProps extends React.HTMLAttributes<HTMLElement | Profile> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IRouteInfo interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IProfile) => void;

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

 export interface IProfileStyles {
     /**
      * Style for the root element that will contain the title and text.
      */
      root?: IStyle;

      /**
       * Style for the title of the Profile component.
       */
      title?: IStyle;

      /**
       * Style for the text of the Profile component.
       */
      text?: IStyle;
 }
