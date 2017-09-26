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
        width: '20vw',
        height: '80vh',
        margin: '10px',
      },
      searchButtonBox: {
        display: 'flex',
        justifyContent: 'center',
      },
      googleMap: {
        width: '78vw',
        height: '88vh',
      }
  }})