import * as React from 'react';
import { PlaceAutocomplete } from './PlaceAutocomplete';
import { IStyle, ITheme, IRawStyle } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface IPlaceAutocomplete {
     /** 
      * Sets the text of the PlaceAutocomplete component
      */
     getPlace: () => google.maps.places.PlaceResult;
 }

 export interface IPlaceAutocompleteProps extends React.HTMLAttributes<HTMLElement | PlaceAutocomplete> {

    // The following props should be in most every component prop interface.

    /**
     * Optional callback to access the IPlaceAutocomplete interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IPlaceAutocomplete) => void;

    /**
     * Optional styling to be applied to the component.
     */
    styles?: IPlaceAutocompleteStyles;

    // End of props shared by all components.
    
    /**
     * Title to be displayed next to the input html element.
     */
    title?: string;

    /**
     * Callback to be invoked when enter key is pressed while focusing the html input element.
     */
    onEnterPressed?: () => void;

    /** 
     * Callback invoked when selecting a google place or when losing focus on the input element
     */
    onBlur?: () => void;
 }

 export interface IPlaceAutocompleteStyles {
    input: IRawStyle;
    root: IRawStyle;
    labelContainer: IRawStyle;
    inputContainer: IRawStyle;
 }