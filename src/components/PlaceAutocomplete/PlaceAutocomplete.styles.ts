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
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        height: '30px'
      },
      root: {
        display: 'flex',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        paddingBottom: '10px'
      },
      labelContainer: {
        width: '28%',
        justifyContent: 'center',
        marginLeft: '5px',
        alignContent: 'center'
      },
      inputContainer: {
        width: '100%'
      }
  }})
