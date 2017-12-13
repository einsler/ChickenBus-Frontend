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
        minWidth: '323px',
        height: '80vh',
        margin: '10px',
      },
      searchButtonBox: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px'
      },
      googleMap: {
        width: '76%',
        height: '91vh',
      },
      locationInput: {
        width: '100%',
        height: '30px'
      },

  }})
