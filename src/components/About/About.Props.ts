import * as React from 'react';
import { About } from './About';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface IAbout {

 }

 export interface IAboutProps extends React.HTMLAttributes<HTMLBaseElement | About> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IAbout interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IAbout) => void;

    // End of props shared by all components.

    content?: JSX.Element;

    /**
     * The optional custom styling to be applied to the About component.
     */
    styles?: IAboutStyles;

 }

 export interface IAboutStyles {
   root: IStyle;
 }
