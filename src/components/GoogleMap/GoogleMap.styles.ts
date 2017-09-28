import { IGoogleMapStyles } from './GoogleMap.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
  export const getStyles = memoizeFunction((): IGoogleMapStyles => {
    return {
      root: {
        margin: 'auto',
        width: '100%',
        height: '100%',
      },
  }})