import * as React from 'react';
import { LogContent } from './LogContent';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface ILogContent {

 }

 export interface ILogContentProps extends React.HTMLAttributes<HTMLBaseElement | LogContent> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the ILog interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: ILogContent) => void;

    // End of props shared by all components.

    content?: JSX.Element;

    /**
     * The optional custom styling to be applied to the Log component.
     */
    styles?: ILogContentStyles;
 }
  export interface ILogContentStyles {
     root: IStyle;
  }
