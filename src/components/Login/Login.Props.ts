import * as React from 'react';
import { Login } from './Login';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface ILogin {

 }

 export interface ILoginProps extends React.HTMLAttributes<HTMLBaseElement | Login> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the ILogin interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: ILogin) => void;

    // End of props shared by all components.

    content?: JSX.Element;

    /**
     * The optional custom styling to be applied to the Login component.
     */
    styles?: ILoginStyles;
 }

 export interface ILoginStyles {
   root: IStyle;
 }
