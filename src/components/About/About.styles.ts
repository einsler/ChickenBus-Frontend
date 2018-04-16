import { IAboutStyles } from './About.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
  const about = require('../../images/about.jpg');

  export const getStyles = memoizeFunction((): IAboutStyles => {
    return {
      root: {
        margin: '0 auto',
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        backgroundImage: "url('../../images/about.jpg')",
        backgroundSize: 'auto 100%',
        backgroundPosition: 'left',
        backgroundAttachment: 'fixed',
      },
      text:{
        margin: '0 auto',
        width: '80%',
        height: '100%',
        overflowY: 'scroll',
      },
      emblem: {
        height: '20%',
        width: '20%',
      },
      info:{
        margin: '20px',

      },
      faq:{
        margin: '20px',

      },
      mission:{
        margin: '20px',

      },
    }
    });
