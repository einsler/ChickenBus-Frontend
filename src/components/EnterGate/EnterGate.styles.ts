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
      marginRight: '0px'
    },
    enterButtonBox: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px'
    },
    googleMap: {
      width: '80%',
    },
    form: {
      overflowY: 'auto',
      marginRight: '0px',
      width: '30vw',
      minWidth: '414',
      height: '88vh'
    },
    flex: {
      marginTop: '10px',
      backgroundColor: 'white'
    },
    label: {
        paddingLeft: '5px'
    },
    input: {
      justifyContent: 'center',
      alignContent: 'center',
      padding:'5px'
    }
}})
