import * as React from 'react';
import { HomeContent } from './HomeContent';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface IHomeContent {

 }

 export interface IHomeContentProps extends React.HTMLAttributes<HTMLBaseElement | HomeContent> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IHomeContent interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IHomeContent) => void;

    // End of props shared by all components.

    content?: JSX.Element;

    /**
     * The optional custom styling to be applied to the HomeContent component.
     */
    styles?: IHomeContentStyles;
 }
 export interface IBlogItem {
   title: string;
   imgurl: string;
   text: string;
 }

 export interface IHomeContentStyles {
   root: IStyle;
   searchPanel: IStyle;
   blog: IStyle;
   ad1: IStyle;
   ad2: IStyle;
   margin: IStyle;
 }
