import { ISearchContentStyles } from './SearchContent.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
  const tour = require('../../images/nicaragua.jpg');
  const bus = require('../../images/cb.jpg');

  export const getStyles = memoizeFunction((): ISearchContentStyles => {
    return {
      root: {
        margin: 'auto',
        width: '100%',
        height: '100%',
        display: 'flex'
      },
      searchPanel: {
        minWidth: '30%',
        maxWidth: '30%',
        maxHeight: '100 vh',
        overflowY: 'scroll',
        backgroundImage: "url('../../images/nicaragua.jpg')",
        backgroundSize: '30% auto',
        backgroundPosition: 'bottom 10px left',
        backgroundAttachment: 'fixed',
      },
      searchBox: {
          padding: '10px'
      },
      searchButtonBox: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px',
        height: '5%'
      },
      googleMap: {
        width: '100%',
        height: 'auto',
      },
      locationInput: {
        width: '100%',
        height: '10%'
      },
      adspace: {
        width: '100%',
        height: '25px',
      },
      icon: {
        //backgroundImage: "url('../../images/circle.png')",
        //backgroundRepeat: 'no-repeat',
        //backgroundSize: '300% auto',
        //backgroundPosition: 'center 100px',
        margin: '20px',
      },
      signature: {
        backgroundImage: "url('../../images/cb.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
        width: '100%',
        height: '190px',
        display: 'block',
        textAlign: 'center',
      },

      footer: {
        width: '100%',
        minHeight: '10%',
      },
      emblem: {
        height: '25%',
        width: '25%',
      },
      white: {
        height: '100%',
        width: '100%',
        zIndex: '-1',
      },
      tour: {
        width: "100%",
        height: 'auto',
      },
      fakeAd: {
        width: "100%",
        height: 'auto',
      },
      something: {
        backgroundImage: "url('../../images/cb.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
        justifyContent: "center"

      },

  }})
