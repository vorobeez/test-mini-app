import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from "react-router-dom";
import { MessageType } from "@dlghq/mini-apps-bridge";

import { useBridge } from "./Bridge";

export function RootPage() {
    const location = useLocation();
    const [messageExtensionsPayload, setMessageExtensionPayload] = useState();
    const [peerExtensionsPayload, setPeerExtensionPayload] = useState();
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
                    setMessageExtensionPayload(message.payload);
                });
            } else if (peerId) {
                bridge.sendRequest({
                    type: MessageType.GetDialogPeer,
                    payload: {
                        peerId: Number(peerId),
                    },
                }).then((message) => {
                    setPeerExtensionPayload(message.payload.peer);
                });
            }
        }
    }, [bridge, params]);

    return (
        <div>
            <h1>Root Page</h1>
            <h2>Message Extension</h2>
            {messageExtensionsPayload && (
                <pre>{JSON.stringify(messageExtensionsPayload, null, 2)}</pre>
            )}
            <h2>Peer Extension</h2>
            {peerExtensionsPayload && (
                <pre>{JSON.stringify(peerExtensionsPayload, null, 2)}</pre>
            )}
        </div>
    );
}
