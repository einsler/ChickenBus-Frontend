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
        height: '30px',
        width: '100%'
      },
      root: {
        display: 'flex'
      },
      labelContainer: {
        width: '25%',
        margin: '5px',
        justifyContent: 'center',
        alignContent: 'center'
      },
      inputContainer: {
        width: '75%',
        margin: '5px',
        justifyContent: 'center',
        alignContent: 'center'
      }
  }})