import { IRouteInfoStyles } from './RouteInfo.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
  export const getStyles = memoizeFunction((): IRouteInfoStyles => {
    return {
      root: {
        border: '2px solid #000000'
      },
      infoContainer: {
        display: 'flex',
        alignItems: 'center'
      },
      title: {
        marginLeft: '10px',
        marginRight: '10px'
      },
      text: { 
        
      }
    }
})