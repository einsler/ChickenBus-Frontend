import { IBasePageStyles } from './BasePage.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
  
  export const getStyles = memoizeFunction((): IBasePageStyles => {
    return {
      header: {
        display: 'inline-block',
        backgroundColor: '#ADD8E6'
      }
    }
  });