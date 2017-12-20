import { ISearchContentStyles } from './SearchContent.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

  export const getStyles = memoizeFunction((): ISearchContentStyles => {
    return {
      root: {
        margin: 'auto',
        width: '100%',
        height: '100%',
        display: 'flex'
      },
      searchPanel: {
        minWidth: '333px',
        maxHeight: '60 vh',
        marginRight:'3px'
      },
      searchButtonBox: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px',
        height: '5%'
      },
      googleMap: {
        width: '100%',
        height: '100%',
      },
      locationInput: {
        width: '100%',
        height: '10%'
      },

  }})
