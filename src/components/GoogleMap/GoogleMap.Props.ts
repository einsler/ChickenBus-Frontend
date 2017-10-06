import * as React from 'react';
import { GoogleMap } from './GoogleMap';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { SearchBox } from "office-ui-fabric-react/lib/components/SearchBox";

 export interface IGoogleMap {
    updateMap(): void;
 }

 export interface IGoogleMapProps extends React.HTMLAttributes<HTMLElement | GoogleMap> {
    /**
     * Optional callback to access the IGoogleMap interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IGoogleMap) => void;

    /**
     * The optional custom styling to be applied to the GoogleMap component.
     */
    styles?: IGoogleMapStyles;

    /**
     * The searchbox used in the searchContent component for inputing the origin.
     */
    origin: string;

    /**
     * The searchbox used in the searchContent component for inputing the destination.
     */
    destination: string;
 }

 export interface IGoogleMapStyles {
    root: IStyle;
 }