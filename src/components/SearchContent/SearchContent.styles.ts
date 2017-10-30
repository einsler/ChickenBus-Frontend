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
        width: '24%',
        height: '80vh',
        margin: '10px',
      },
      searchButtonBox: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px'
      },
      return: {

        height: '77%',
        margin: '-10px',
        padding: '10px',
        background: '#C3E9F0',

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
