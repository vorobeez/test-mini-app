import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from "react-router-dom";
import { MessageType } from "@dlghq/mini-apps-bridge";

import {useBridge} from "./Bridge";

export function RootPage() {
    const location = useLocation();
    const [messageContent, setMessageContent] = useState();
    const [peer, setPeer] = useState();
    const params = useMemo(() => new URLSearchParams(location.search), [location]);
    const bridge = useBridge();

    useEffect(() => {
        const action = params.get('action');
        const messageId = params.get('messageId');
        const peerId = params.get('peerId');

        if (bridge && action) {
            if (messageId) {
                bridge.sendRequest({
                    type: MessageType.GetDialogMessage,
                    payload: {
                        messageId,
                    },
                }).then((message) => {
                    setMessageContent(message.payload.messageContent);
                });
            } else if (peerId) {
                bridge.sendRequest({
                    type: MessageType.GetDialogPeer,
                    payload: {
                        peerId: Number(peerId),
                    },
                }).then((message) => {
                    setPeer(message.payload.peer);
                });
            }
        }
    }, [bridge, params]);

    return (
        <React.Fragment>
            <h1>Root Page</h1>
            <h2>Message Extension</h2>
            {messageContent && (
                <p>{JSON.stringify(messageContent, null, 2)}</p>
            )}
            <h2>Peer Extension</h2>
            {peer && (
                <p>{JSON.stringify(peer, null, 2)}</p>
            )}
        </React.Fragment>
    );
}