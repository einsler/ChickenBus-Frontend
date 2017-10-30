import { ILogContentStyles } from './LogContent.Props';
import { ITheme, mergeStyleSets, getFocusStyle, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

export const getStyles = memoizeFunction((): ILogContentStyles => {
  return {
    root: {
      width: '95%',
      height: '100%',
      display: 'flex',
      border: 'solid',
      margin: '10px',
      padding: '10px'

    },
}})
