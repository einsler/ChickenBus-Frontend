import * as React from 'react';
import { PlaceAutocomplete } from './PlaceAutocomplete';
import { IStyle, ITheme, IRawStyle } from 'office-ui-fabric-react/lib/Styling';

/**
 * Add an interface for any public methods you want to expose that can be called by reference to
 * the component.
 */

 export interface IPlaceAutocomplete {
     /** 
      * Gets the result of the GoogleAutocomplete.
      */
     getPlace: () => google.maps.places.PlaceResult;
     /** 
      * Gets the coords of the GoogleAutocomplete.
      */
      getCoords: () => google.maps.LatLng;
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
 }

 export interface IPlaceAutocompleteStyles {
    input: IRawStyle;
    root: IRawStyle;
    labelContainer: IRawStyle;
    inputContainer: IRawStyle;
 }