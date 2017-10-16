import { IEnterGateStyles } from './EnterGate.Props';
import { ITheme, mergeStyleSets, getFocusStyle, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

export const getStyles = memoizeFunction((): IEnterGateStyles => {
  return {
    root: {
      margin: 'auto',
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
    },
    googleMap: {
      width: '70vw',
      height: '88vh',
    }
}})
