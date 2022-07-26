import { useEffect, useState } from "react";
import Api from "../../config/Api";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ArrowsExpandIcon, CubeIcon, CubeTransparentIcon, InformationCircleIcon, LinkIcon, LockClosedIcon } from "@heroicons/react/outline";
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
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your Github Teams assignments</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                {/* <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 font-GilroyMedium sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm text-gray-500">
                            <LinkIcon className="h-5 inline" /> &nbsp; Cluster API
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.clusterApi && !loadingClusterInfo ? clusterInfo.clusterApi :
                                    (
                                        <Skeleton />
                                    )
                            }
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-GilroyMedium text-gray-500">
                            <InformationCircleIcon className="h-5 inline" /> &nbsp; Version
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.clusterVersion && !loadingClusterInfo ? clusterInfo.clusterVersion :
                                    (
                                        <Skeleton />
                                    )
                            }
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-GilroyMedium text-gray-500">
                            <CubeTransparentIcon className="h-5 inline" /> &nbsp; Total Namespaces
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.totalNamespaces && !loadingClusterInfo ? clusterInfo.totalNamespaces :
                                    (
                                        <Skeleton />
                                    )
                            }
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-GilroyMedium text-gray-500">
                            <CubeIcon className="h-5 inline" /> &nbsp; Total Pods
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.totalPods && !loadingClusterInfo ? clusterInfo.totalPods :
                                    (
                                        <Skeleton />
                                    )
                            }
                        </dd>
                    </div>
                </dl> */}
            </div>
        </div>
    )
}

export default Permissions;