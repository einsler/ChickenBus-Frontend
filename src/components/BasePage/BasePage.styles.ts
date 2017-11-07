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
        width: '100vw',
      },
      header: {
        width:'100%',
        display: 'flex',
        backgroundColor: '#696969',
        justifyContent: 'flex-End',
      },
      logo: {
        color: '#ffffff',
        margin: '10px'
      },
      profile: {
        marginLeft: 'auto',
        padding: '15px'
      },
      pivot: {
        margin: '10px',
      }
    }
  });
