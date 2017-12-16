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
        border: '2px solid #000000',
        padding: '5px'
      },
      infoContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '25px',
        maxWidth: '100%'
      },
      title: {
        marginLeft: '10px',
        width: '20%',
        marginRight: '10px'
      },
      text: { 
        
      },
      timeContainer: {
        display: 'flex',
        justifyItems: 'center',
        maxHeight: '125px',
        overflowY: 'auto',
        width: '100%'        
      }
    }
})