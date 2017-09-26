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
      root: {
        height: '20vh',
        width: '100vw',
      },
      header: {
        width:'100%',
        display: 'flex',
        backgroundColor: '#000000'
      },
      logo: {
        color: '#ffffff',
        margin: '10px'
      },
      profile: {
        marginLeft: 'auto',
        padding: '15px'
      }
    }
  });