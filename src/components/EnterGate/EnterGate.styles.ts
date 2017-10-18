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
    },
    enterButtonBox: {
      display: 'flex',
      justifyContent: 'center',
      margin: '25px'
    },
    googleMap: {
      width: '80%',
      height: '90vh',
    },
    form: {
      overflowY: 'scroll',
      margin: '10px',
      width: '30vw',
      height: '88vh'
    },
    flex: {
      display: 'flex',
    },
    times: {
      
    },
    label: {
      width: '25%',
      margin: '5px',
      justifyContent: 'center',
      alignContent: 'center'
    },
    input: {
      width: '75%',
      justifyContent: 'center',
      alignContent: 'center'
    }
}})
