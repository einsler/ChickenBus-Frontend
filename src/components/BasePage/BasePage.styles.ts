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
        width:'100%',
        display: 'flex',
        backgroundColor: '#ADD8E6'
      },
      logo: {
        margin: '10px'
      },
      profile: {
        marginLeft: 'auto',
        padding: '15px'
      }
    }
  });