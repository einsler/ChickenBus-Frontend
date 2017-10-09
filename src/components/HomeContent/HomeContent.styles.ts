import { IHomeContentStyles } from './HomeContent.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

  export const getStyles = memoizeFunction((): IHomeContentStyles => {
    return {
      root: {
        margin: 'auto',
        width: '100%',
        height: '100%',
        display: 'block'
      },
      searchPanel: {
        border: '1px solid black',
        display: 'flex',
        width: '57%',
        margin: '15px',
        position: 'absolute',
        left: '285px',
        top: '100px',
      },
      blog: {
        border: '1px solid black',
        margin: 'auto',
        width: '57%',
        float: 'left',
        position: 'absolute',
        left: '300px',
        top: '200px',
      },
      ad1: {
        float: 'right',
        border: '1px solid black',
        position: 'absolute',
        left: '1125px',
        top: '115px',
        width: '280px',
        height: '665px'

      },
      ad2: {
        float: 'left',
        width: '280px',
        position: 'absolute',
        left: '10px',
        top: '200px',
        border: '1px solid black',
      },
      margin: {
        margin: '3px'
      }
    }
  });
