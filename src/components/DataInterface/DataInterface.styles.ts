import { IDataInterfaceStyles } from './DataInterface.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

export const getStyles = memoizeFunction((): IDataInterfaceStyles => {
  return {
    root: {
      width: '100vw',
    },
  }
});
