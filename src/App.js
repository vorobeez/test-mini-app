import React from 'react';
import { Route, Switch, Link } from "react-router-dom";

import { Bridge } from "./Bridge";
import { RootPage } from "./RootPage";
import { SendMessagePage } from "./SendMessagePage";
import { SelectPeersPage } from "./SelectPeersPage";
import { SelectUsersPage } from "./SelectUsersPage";

function App() {
    return (
        <React.Fragment>
            <ul>
                <li>
                    <Link to="/">Root</Link>
                </li>
                <li>
                    <Link to="/send_message">Send Message</Link>
                </li>
                <li>
                    <Link to="/select_peers">Select Peers</Link>
                </li>
                <li>
                    <Link to="/select_users">Select Users</Link>
                </li>
            </ul>
            <Bridge>
                <Switch>
                    <Route path="/" exact component={RootPage} />
                    <Route path="/send_message" component={SendMessagePage} />
                    <Route path="/select_peers" component={SelectPeersPage} />
                    <Route path="/select_users" component={SelectUsersPage} />
                </Switch>
            </Bridge>
        </React.Fragment>
    );
}

export default App;
