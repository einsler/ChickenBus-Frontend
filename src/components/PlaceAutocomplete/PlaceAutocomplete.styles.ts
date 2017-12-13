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
        width: '75%',
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: '0px',
        marginBottom: '0px'
      },
      root: {
        margin: '10px',
        display: 'flex'
      },
      labelContainer: {
        width: '25%',
        justifyContent: 'center',
        alignContent: 'center'
      },
      inputContainer: {
        width: '75%',
        justifyContent: 'center',
        alignContent: 'center'
      }
  }})