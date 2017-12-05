import { ILoginStyles } from './Login.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

  export const getStyles = memoizeFunction((): ILoginStyles => {
    return {
      root: {
        margin: '0 auto',
        width: '800px'
      },
      loginButton: {
          margin: '0 auto',
          textAlign: 'center'
      }
    }
    });
