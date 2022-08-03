import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";

export const ClusterInfoContext = createContext({});

export const useClusterInfoContext = () => {
    return useContext(ClusterInfoContext);
};

type Props = {
    children: ReactNode;
};

export interface ClusterInfoInterface {
    clusterApi: "",
    clusterVersion: "",
    namespace: "",
    totalSAs: 0
}

export const ClusterInfoContextProvider = ({ children }: Props) => {
    const [clusterInfo, setClusterInfo] = useState<ClusterInfoInterface>();

    const contextValue = {
        clusterInfo,
        setClusterInfo,
    };

    return (
        <ClusterInfoContext.Provider value={contextValue}>
            {children}
        </ClusterInfoContext.Provider>
    )
}