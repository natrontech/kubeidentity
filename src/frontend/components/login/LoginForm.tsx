import { useEffect } from "react";
import { useUserContext } from "../../contexts/userContext"

const LoginForm = () => {

    const { signInWithGithub }: any = useUserContext();

    const handleGithubLogin = () => {
        window.open(
            `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}`,
            "_self"
        );
    }

    useEffect(() => {
        const url = window.location.href;
        const code = url.split("?code=")[1];

        if (code) {
            signInWithGithub(code);
        }
    }, []);

    return (
        <div>
            <button
                onClick={handleGithubLogin}
            >
                Login
            </button>
        </div>
    )
}

export default LoginForm;