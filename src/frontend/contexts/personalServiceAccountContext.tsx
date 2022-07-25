import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";

export const PersonalServiceAccountContext = createContext({});

export const usePersonalServiceAccountContext = () => {
    return useContext(PersonalServiceAccountContext);
};

type Props = {
    children: ReactNode;
};

export const PersonalServiceAccountContextProvider = ({ children }: Props) => {
    const [personalServiceAccount, setPersonalServiceAccount] = useState<any>();

    const contextValue = {
        personalServiceAccount,
        setPersonalServiceAccount,
    };

    return (
        <PersonalServiceAccountContext.Provider value={contextValue}>
            {children}
        </PersonalServiceAccountContext.Provider>
    )
}