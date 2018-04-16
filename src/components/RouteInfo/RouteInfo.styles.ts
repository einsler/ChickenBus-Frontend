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
      maxWidth: '100%'
    },
    name: {
      marginTop: '15px',
      textAlign: 'left',
      fontSize: '100%',
      lineHeight: '175%'
    },

    time: {
      marginTop: '15px',
      textAlign: 'right',
      marginLeft: 'auto',
      fontSize: '100%',
      lineHeight: '175%'
    },

    title: {
      marginRight: '10px',
      height: '15px',
      marginTop: '5px',
      marginBottom: '5px'
    },

    cost: {
      marginLeft: 'auto',
    },

    text: {
    },

    notes: {
      textAlign: 'left',
      lineHeight: '175%'
    },

    timeContainer: {
      display: 'flex',
      justifyItems: 'center',
      maxHeight: '125px',
      width: '100%'
    },
  }
});
