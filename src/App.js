import React from 'react';
import { Route, Switch } from "react-router-dom";

import {RootPage} from "./RootPage";
import {Bridge} from "./Bridge";

function App() {
    return (
        <Bridge>
            <Switch>
                <Route path="/" exact component={RootPage} />
            </Switch>
        </Bridge>
    );
}

export default App;
