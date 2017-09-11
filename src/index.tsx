import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Hello } from "./components/Hello";

const MyPage = () => (<Fabric><Hello compiler='ts' framework='react'/></Fabric>);

ReactDOM.render(<MyPage />, document.body);
