import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../components/alerts/Alerts";
import Cookies from 'js-cookie';
import Api from "../config/Api";

export const UserContext = createContext({});

export interface User {
    uid: number;
    name: string;
    email: string;
    token: string;
}

export const useUserContext = () => {
    return useContext(UserContext);
};

type Props = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
    }, []);

    const signInWithGithub = () => {
        setLoading(true);
        setError(null);
    }

    const logoutUser = () => {
        Cookies.remove('token');
        setUser(null);
        // @ts-ignore
        delete Api.defaults.headers.Authorization;
        setUser(null);
        setError(null);
        DefaultAlert("Logged out", AlertType.Success);
    }

    const contextValue = {
        user,
        loading,
        error,
        signInWithGithub,
        logoutUser
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}