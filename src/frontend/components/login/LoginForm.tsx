import { useEffect } from "react";
import { useUserContext } from "../../contexts/userContext"
import ExportedImage from "next-image-export-optimizer"
import { GithubIcon } from "../../lib/Icons";

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
        <div
            className="absolute top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2 sm:w-4/6 w-full bg-opacity-90 bg-gradient-to-r from-secondary to-secondary-dark rounded-lg shadow-lg py-10"
        >
            <div
                className="h-32 w-32 relative m-auto mb-5"
            >
                <ExportedImage
                    className="pointer-events-none"
                    src="images/logo/kubeidentity_logo_color.png"
                    alt="KubeIdentity Logo"
                    objectFit="contain"
                    layout="fill"
                />
            </div>
            <h1 className="text-center text-primary sm:text-5xl text-3xl font-GilroyHeavy">KubeIdentity</h1>
            <div
                className="bg-white w-56 py-2 px-4 m-auto cursor-pointer rounded-lg mt-10 hover:scale-105 transition-all duration-150 ease-in-out"
                onClick={handleGithubLogin}
            >
                <GithubIcon color="black" width={26} height={26} /> Continue with Github
            </div>
        </div>
    )
}

export default LoginForm;