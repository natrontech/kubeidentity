import { useEffect, useState } from "react";
import Api from "../../config/Api";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClusterInfo = () => {

    const [clusterInfo, setClusterInfo] = useState({
        clusterName: "",
        clusterVersion: "",
        totalNamespaces: 0,
        totalPods: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await Api.get("/clusterinfo");
                    if (data) {
                        setClusterInfo(data);
                    }
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    DefaultAlertMessage("Error", "Could not get Clusterinfo", AlertType.Error);
                }
            }
        )()
    }, []);

    return (
        <div
            className="rounded-lg bg-white shadow-md"
        >
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Cluster Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">details about your Kubernetes cluster</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Cluster name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.clusterName && !loading ? clusterInfo.clusterName : 
                                (
                                    <Skeleton />
                                )
                            }
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Version</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.clusterVersion && !loading ? clusterInfo.clusterVersion : 
                                (
                                    <Skeleton />
                                )
                            }
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Total Namespaces</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.totalNamespaces && !loading ? clusterInfo.totalNamespaces : 
                                (
                                    <Skeleton />
                                )
                            }
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Total Pods</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {
                                clusterInfo.totalPods && !loading ? clusterInfo.totalPods : 
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