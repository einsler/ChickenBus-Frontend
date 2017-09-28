import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric, } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { BasePage } from "./components/index";

const fabricStyle = {
    root: {
        minHeight: '100%'
    }
}

const MyPage = () => (<div style={ fabricStyle.root }><Fabric title="ChickenBus" ><BasePage/></Fabric></div>);

ReactDOM.render(<MyPage />, document.body);