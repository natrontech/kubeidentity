import { useEffect, useState } from "react";
import Api from "../../config/Api";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ArrowsExpandIcon, CubeIcon, CubeTransparentIcon, InformationCircleIcon, LinkIcon, UserIcon } from "@heroicons/react/outline";
import { useUserContext } from "../../contexts/userContext";
import Cookies from "js-cookie";

const ClusterInfo = () => {

    const [clusterInfo, setClusterInfo] = useState({
        clusterApi: "",
        clusterVersion: "",
        namespace: "",
        totalSAs: 0
    });
    const [loadingClusterInfo, setLoadingClusterInfo] = useState(true);

    const { loading, user }: any = useUserContext();



    useEffect(() => {
        (
            async () => {
                if (!loading && user) {
                    try {
                        const { data } = await Api.get("/clusterinfo");
                        if (data) {
                            setClusterInfo(data);
                        }
                        setLoadingClusterInfo(false);
                    } catch (error) {
                        console.log(error);
                        DefaultAlertMessage("Error", "Could not get Clusterinfo", AlertType.Error);
                    }
                }
            }
        )()
    }, [loading, user]);

    return (
        <div
            className="rounded-lg bg-white shadow-md z-0"
        >
            <div className="px-4 py-5 sm:px-6 relative">
                <div
                    className="absolute top-3 right-3"
                >
                    <ArrowsExpandIcon className="inline-block h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg leading-6  text-gray-900">Cluster Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your Kubernetes cluster</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
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
                            <CubeTransparentIcon className="h-5 inline" /> &nbsp; Namespace
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.namespace && !loadingClusterInfo ? clusterInfo.namespace :
                                    (
                                        <Skeleton />
                                    )
                            }
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-GilroyMedium text-gray-500">
                            <UserIcon className="h-5 inline" /> &nbsp; Total SAs
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.totalSAs && !loadingClusterInfo ? clusterInfo.totalSAs :
                                    (
                                        <Skeleton />
                                    )
                            }
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default ClusterInfo;