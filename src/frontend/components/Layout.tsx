import React from "react";
import { useUserContext } from "../contexts/userContext";
import { classNames } from "../lib/design";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props: any) {

    const { user, loading }: any = useUserContext();

    return (
        <div className="h-screen scrollbar-hide">
            {
                user && !loading ? (
                    <Navbar />
                ) : null
            }


            <main className={classNames(
                user && !loading ? "pt-20" : "pt-0",
                "transition-all duration-150 ease-in-out",
                ""
            )}>
                {React.cloneElement(props.children)}
            </main>
            {
                user && !loading ? (
                    <Footer />
                ) : null
            }

            {
                loading ? (
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center animate-pulse">
                        <div className="w-full h-full bg-gray-100 opacity-75 z-50"></div>
                        <div className="w-full h-full bg-gray-100 opacity-75 z-50"></div>
                        <div className="w-full h-full bg-gray-100 opacity-75 z-50"></div>
                    </div>
                ) : null
            }
        </div>
    )
}