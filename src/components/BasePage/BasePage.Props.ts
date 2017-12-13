import * as React from 'react';
import { BasePage } from './BasePage';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface IBasePage {

 }

 export interface IBasePageProps extends React.HTMLAttributes<HTMLBaseElement | BasePage> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IBasePage interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IBasePage) => void;

    // End of props shared by all components.

    content?: JSX.Element;

    /**
     * The optional custom styling to be applied to the BasePage component.
     */
    styles?: IBasePageStyles;
 }

 export interface IBasePageStyles {
    header: IStyle;
    logo: IStyle;
    profile: IStyle;
    root: IStyle;
    pivot: IStyle;
    content: IStyle;
 }
