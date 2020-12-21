import React, { useCallback, useState } from 'react';
import { MessageType } from "@dlghq/mini-apps-bridge";

import { useBridge } from "./Bridge";

export function SendMessagePage() {
    const bridge = useBridge();
    const [peerId, setPeerId] = useState('');
    const [peerType, setPeerType] = useState('');
    const sendMessage = useCallback(() => {
        bridge.sendMessage({
            type: MessageType.SendDialogMessage,
            payload: {
                peer: {
                    id: Number(peerId),
                    type: peerType,
                },
                messageContent: {
                    title: 'test title',
                    text: 'test text',
                    link: {
                        pathname: '/send_message',
                    },
                },
            },
        });
    }, [bridge, peerId, peerType]);

    return (
        <div>
            <h1>
                Send Message Page
            </h1>
            <label>
                PeerId:
                <input
                    name="peerId"
                    value={peerId}
                    onChange={(e) => {setPeerId(e.target.value)}}
                />
            </label>
            <label>
                PeerType:
                <input
                    name="peerType"
                    value={peerType}
                    onChange={(e) => {setPeerType(e.target.value)}}
                />
            </label>
            <button onClick={sendMessage}>send message to</button>
        </div>
    );
}
