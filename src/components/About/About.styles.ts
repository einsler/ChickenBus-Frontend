import { IAboutStyles } from './About.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

  export const getStyles = memoizeFunction((): IAboutStyles => {
    return {
      root: {
        margin: '0 auto',
        width: '800px'
      },
    }
    });
