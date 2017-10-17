import { IPlaceAutocompleteStyles } from './PlaceAutocomplete.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
  export const getStyles = memoizeFunction((): IPlaceAutocompleteStyles => {
    return {
      input: {
        width: '100%',
        height: '30px'
      }
  }})