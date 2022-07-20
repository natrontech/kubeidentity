import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../components/alerts/Alerts";
import Cookies from 'js-cookie';
import Api from "../config/Api";

export const UserContext = createContext({});

export interface User {
    id: number;
    login: string;
    email: string;
    name: string;
    avatar_url: string;
    github_team_slugs: string[];
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
        const token = Cookies.get("token");
        if (token) {
            //@ts-ignore
            Api.defaults.headers.Authorization = 'Bearer ' + token;
            Api.get("/auth/github")
                .then(res => {
                    setUser(res.data);
                    setLoading(false);
                }).catch(err => {
                    setError(err);
                    setLoading(false);
                    logoutUser(true);
                }).finally(() => {
                    setLoading(false);
                });
        } else {
            setError(null);
            setUser(null);
            setLoading(false);
        }
    }, []);

    const signInWithGithub = (code: string) => {

        setLoading(true);
        setError(null);
        setUser(null);

        // send request to server
        Api({
            method: "post",
            url: "/auth/github",
            headers: {},
            data: {
                github_code: code
            }
        })
            .then(({ data }) => {
                const tempUser: User = {
                    id: data.githubUser.id,
                    login: data.githubUser.login,
                    email: data.githubUser.email,
                    name: data.githubUser.name,
                    avatar_url: data.githubUser.avatar_url,
                    github_team_slugs: data.githubUser.github_team_slugs
                };
                setUser(tempUser);
                setLoading(false);
                setError(null);
                Cookies.set("token", data.token);
                router.push("/dashboard");
                DefaultAlert("Logged in", AlertType.Success);
            }).catch(({ response }) => {
                console.log(response);
                setLoading(false);
                setError(response);
                setUser(null);
                Cookies.remove("token");
            }).finally(() => {
                setLoading(false);
            });
    }

    const logoutUser = (noalert: boolean | null) => {
        Cookies.remove('token');
        setUser(null);
        // @ts-ignore
        delete Api.defaults.headers.Authorization;
        setUser(null);
        setError(null);
        if (!noalert) {
            DefaultAlert("Logged out", AlertType.Success);
        }
        router.push("/");
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