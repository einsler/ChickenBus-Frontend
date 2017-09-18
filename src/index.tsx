import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { BasePage } from "./components/index";

const MyPage = () => (<Fabric><BasePage/></Fabric>);

ReactDOM.render(<MyPage />, document.body);
