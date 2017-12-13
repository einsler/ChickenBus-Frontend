import { IEnterGateStyles } from './EnterGate.Props';
import { ITheme, mergeStyleSets, getFocusStyle, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

export const getStyles = memoizeFunction((): IEnterGateStyles => {
  return {
    root: {
      width: '100%',
      height: '100%',
      display: 'flex'
    },
    entryPanel: {
      width: '28vw',
      height: '80vh',
      margin: '10px',
      marginRight: '0px'
    },
    enterButtonBox: {
      display: 'flex',
      justifyContent: 'center',
      margin: '25px'
    },
    googleMap: {
      width: '80%',
    },
    form: {
      overflowY: 'scroll',
      margin: '20px',
      marginRight: '0px',
      width: '30vw',
      minWidth: '414',
      height: '88vh'
    },
    flex: {
      display: 'flex',
    },
    label: {
      width: '25%',
      margin: '5px',
      justifyContent: 'center',
      alignContent: 'center'
    },
    input: {
      width: '60%',
      justifyContent: 'center',
      alignContent: 'center'
    }
}})
