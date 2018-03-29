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
        margin: '0 auto',
        width: '800px'
      },
      registerButton: {
          margin: '0 auto',
          textAlign: 'center'
      }
    }
    });
