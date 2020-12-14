import React, { createContext, useContext, useMemo } from "react";
import { createBridge, promisifyBridge } from "@dlghq/mini-apps-bridge";

const BridgeContext = createContext(undefined);

export function useBridge() {
    return useContext(BridgeContext);
}

export function Bridge({ children }) {
    const bridge = useMemo(() => promisifyBridge(createBridge()), []);

    return (
        <BridgeContext.Provider value={bridge}>
            {children}
        </BridgeContext.Provider>
    )
}