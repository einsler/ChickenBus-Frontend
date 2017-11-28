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
      margin: 'auto',
      width: '100%',
      height: '100%',
      display: 'flex'
    },
    header: {
      width: '24%',
      height: '80vh',
      margin: '10px',
    },
    manageRoute: {
      width: '76%',
      height: '91vh',
    },
    routeInfo: {
    },
    buttonContainer: {
    },
  }
});
