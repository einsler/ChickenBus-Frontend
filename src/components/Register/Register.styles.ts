import { IRegisterStyles } from './Register.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

  export const getStyles = memoizeFunction((): IRegisterStyles => {
    return {
      root: {
        margin: 'auto',
      }
    }
    });
