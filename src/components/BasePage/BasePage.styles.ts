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
        height: '10vh',
        backgroundColor: '#a9a9a9',
        justifyContent: 'flex-End',
      },
      content: {
        height: '92vh',
        backgroundColor: '#ffffff'
      },
      nav: {
        overflow: 'hidden',
        width: '100%',
        //height: '',
      },
      logo: {
        position: 'relative',
        overflow: 'hidden',
        height: '213px',
        width: '213px',
        top: '-65px',
        left: '16px',

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
