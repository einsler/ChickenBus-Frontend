import { ISearchContentStyles } from './SearchContent.Props';
import {
    ITheme,
    mergeStyleSets,
    getFocusStyle,
    FontSizes
  } from 'office-ui-fabric-react/lib/Styling';
  import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

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
        height: '99%',
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
      },
      footer: {
        width: '100%',
        minHeight: '10%',
      },
      emblem: {
        height: '20%',
        width: '20%',


      },

  }})
