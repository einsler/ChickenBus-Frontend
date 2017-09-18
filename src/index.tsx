import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Example } from "./components/index";

const MyPage = () => (<Fabric><Example title='Example 2' text='Here is the text'/></Fabric>);

ReactDOM.render(<MyPage />, document.body);
