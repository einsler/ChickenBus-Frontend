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
      },
      searchPanel: {
        width: '25%',
        float: 'left',
        margin: '20 px',
      },
      googleMap: {
        width: '70%',
        height: '500px',
        float: 'left',
        margin: '10px'
      }
  }})