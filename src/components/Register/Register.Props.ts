import * as React from 'react';
import { Register } from './Register';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface IRegister {

 }

 export interface IRegisterProps extends React.HTMLAttributes<HTMLBaseElement | Register> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IRegister interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IRegister) => void;

    // End of props shared by all components.

    content?: JSX.Element;

    /**
     * The optional custom styling to be applied to the Register component.
     */
    styles?: IRegisterStyles;
 }

 export interface IRegisterStyles {
   root: IStyle;
 }
