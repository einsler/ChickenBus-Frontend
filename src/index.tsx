import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric, } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { BasePage } from "./components/index";
import { HashRouter } from 'react-router-dom'

const fabricStyle = {
    root: {
        minHeight: '100%'
    }
}

const MyPage = () => (<HashRouter><BasePage/></HashRouter>);

ReactDOM.render(<MyPage />, document.body);
