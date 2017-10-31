import * as React from 'react';
import { SearchContent } from './SearchContent';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface ISearchContent {

 }

 export interface ISearchContentProps extends React.HTMLAttributes<HTMLBaseElement | SearchContent> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the ISearchContent interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: ISearchContent) => void;

    /**
     * The optional custom styling to be applied to the SearchContent component.
     */
    styles?: ISearchContentStyles;
    // End of props shared by all components.

 }

 export interface ISearchContentStyles {
    searchPanel: IStyle;
    googleMap: IStyle;
    root: IStyle;
    searchButtonBox: IStyle;
    locationInput: IStyle;
    return: IStyle;
 }
