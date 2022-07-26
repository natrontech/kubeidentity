import { useEffect, useState } from "react";
import Api from "../../config/Api";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ArrowsExpandIcon, CubeIcon, CubeTransparentIcon, InformationCircleIcon, LinkIcon, LockClosedIcon, UserGroupIcon } from "@heroicons/react/outline";
import { useUserContext } from "../../contexts/userContext";
import Cookies from "js-cookie";

const Permissions = () => {

    const { loading, user }: any = useUserContext();

    return (
        <div
            className="rounded-lg bg-white shadow-md z-0"
        >
            <div className="px-4 py-5 sm:px-6 relative">
                <div
                    className="absolute top-3 right-3"
                >
                    <LockClosedIcon className="inline-block h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg leading-6  text-gray-900">Permissions</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your Github Teams assignments of <span className="font-GilroyBold">github.com/{
                    user && !loading ?
                        user.organization : "loading..."
                }</span></p>
            </div>
            <div className="px-4 py-5 sm:p-0">
                <div className="grid grid-cols-2 border-t">
                    {
                        user && !loading ?

                            // render user.teams array
                            user.github_team_slugs.map((github_team_slug: string) =>
                                <div key={github_team_slug} className="py-4 font-GilroyMedium sm:px-6">
                                    <div className="text-md sm:hover:scale-105 transition-all duration-150 ease text-primary bg-gray-100 py-4 sm:py-5 rounded-lg text-center">
                                        {github_team_slug}
                                    </div>
                                </div>
                            ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Permissions;