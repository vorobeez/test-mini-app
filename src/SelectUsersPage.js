import React, { useCallback, useState } from 'react';
import { MessageType } from "@dlghq/mini-apps-bridge";

import { useBridge } from "./Bridge";

export function SelectUsersPage() {
    const [peers, setPeers] = useState();
    const bridge = useBridge();
    const handleClick = useCallback(() => {
        bridge.sendRequest({
            type: MessageType.SelectDialogUsers,
            payload: {},
        }, { timeout: 0 }).then((response) => {
            setPeers(() => response.payload.peers);
        });
    }, [bridge]);

    return (
        <div>
            <h1>
                Select Users Page
            </h1>
            <button onClick={handleClick}>
                Select Users
            </button>
            {peers && (
                <React.Fragment>
                    <h2>
                        Peers:
                    </h2>
                    <pre>
                        {JSON.stringify(peers, null, 2)}
                    </pre>
                </React.Fragment>
            )}
        </div>
    )
}
