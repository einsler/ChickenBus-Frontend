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
        padding: '6px',
      },
      infoContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '25px',
        maxWidth: '100%'
      },
      name: {
        marginTop: '25px',
        color: 'blue',
        textAlign: 'left',
        fontSize: '100%'
      },

      time: {
        marginTop: '25px',
        color: 'green',
        marginLeft: 'auto',
        fontSize: '100%'
      },

      title: {
        marginRight: '10px',
        height: '15px',
        marginTop: '5px',
        marginBottom: '5px'
      },

      cost: {
        marginLeft: 'auto',
        color: 'gray'
      },

      text: { 

      },

      notes: {
        color: 'gray',
        textAlign: 'left',
      },
      timeContainer: {
        display: 'flex',
        justifyItems: 'center',
        maxHeight: '125px',
        width: '100%'
      },
    }
});
