import * as React from 'react';
import { Example } from './Example';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface IExample {
     /** Sets the text of the example component */
     setText: () => void;
 }

 export interface IExampleProps extends React.HTMLAttributes<HTMLElement | Example> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IExample interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IExample) => void;

    /**
     * If set, the Example will not be able to have its setText method called.
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
     * The title of the example to be displayed
     */
    title: string;

    /** 
     * The optional text to display in the example 
     */
    text?: string;

    /**
     * Theme provided for use for the styling.
     */
    theme?: ITheme;

    /**
     * The optional custom styling to be applied to the Example component.
     */
    styles?: IExampleStyles;
 }

 export interface IExampleStyles {
     /**
      * Style for the root element that will contain the title and text.
      */
      root?: IStyle;

      /**
       * Style for the title of the Example component.
       */
      title?: IStyle;

      /**
       * Style for the text of the Example component.
       */
      text?: IStyle;
 }