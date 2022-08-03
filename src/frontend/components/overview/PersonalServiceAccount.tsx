import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, DocumentTextIcon, FingerPrintIcon, IdentificationIcon, KeyIcon, LinkIcon, SelectorIcon, UserAddIcon, UserIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Api from "../../config/Api";
import { useClusterInfoContext } from "../../contexts/clusterInfoContext";
import { PersonalServiceAccountInterface, usePersonalServiceAccountContext } from "../../contexts/personalServiceAccountContext";
import { useUserContext } from "../../contexts/userContext";
import { classNames } from "../../lib/design";
import { createKubeConfig } from "../../lib/kubernetes";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../alerts/Alerts";
import Button, { ButtonType } from "../general/Button";

const PersonalServiceAccount = () => {
    const [loadingPersonalServiceAccount, setLoadingPersonalServiceAccount] = useState(true);

    const { loading, user }: any = useUserContext();
    const { personalServiceAccount, setPersonalServiceAccount }: any = usePersonalServiceAccountContext();
    const { clusterInfo, setClusterInfo }: any = useClusterInfoContext();

    useEffect(() => {
        (
            async () => {
                if (!loading && user) {
                    try {
                        const { data } = await Api.get("/personal-service-account");
                        if (data) {
                            const tempPersonalServiceAccount: PersonalServiceAccountInterface = {
                                name: data.name,
                                namespace: data.namespace,
                                token: data.token,
                                ca: data.ca,
                            };
                            setPersonalServiceAccount(tempPersonalServiceAccount);
                        }
                        setLoadingPersonalServiceAccount(false);
                    } catch (error: any) {
                        console.log(error);
                        // print error response to console from error object
                        DefaultAlert(error.response.data["message"], AlertType.Warning);
                        setLoadingPersonalServiceAccount(false);
                    } finally {
                        setLoadingPersonalServiceAccount(false);
                    }
                }
            }
        )()
    }, [loading, user, setPersonalServiceAccount]);


    return (
        <div
            className="rounded-lg bg-white shadow-md z-0"
        >
            <div className="px-4 py-5 sm:px-6 relative">
                <div
                    className="absolute top-3 right-3"
                >
                    <IdentificationIcon className="inline-block h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg leading-6  text-gray-900">Personal Service Account (PSA)</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Select your Personal Kubernetes Service Account</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 font-GilroyMedium sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                            {
                                personalServiceAccount != null && !loadingPersonalServiceAccount ? (
                                    <div>

                                    </div>
                                ) : (
                                    <Skeleton />
                                )
                            }

                            {
                                personalServiceAccount && personalServiceAccount.namespace != "" ? (
                                    <div
                                        className="bg-gray-100 py-5 rounded-lg"
                                    >
                                        <h1 className="text-lg text-center mb-5 w- ">
                                            <FingerPrintIcon className="h-5 inline" /> {personalServiceAccount.name}
                                        </h1>
                                        <div
                                            className="mb-5"
                                        >
                                            <Button buttonType={ButtonType.PrimaryOutline} widthString="w-72" buttonText="Copy Personal Access Token" buttonIcon={<KeyIcon className="h-5 inline" />} onClick={() => {
                                                // copy personalServiceAccount.token to clipboard
                                                navigator.clipboard.writeText(personalServiceAccount.token);
                                                DefaultAlertMessage("Success", "Personal Service Account Token copied to clipboard", AlertType.Success);
                                            }} />
                                        </div>

                                        <div>
                                            <Button buttonType={ButtonType.PrimaryOutline} widthString="w-72" buttonText="Copy Kubeconfig" buttonIcon={<DocumentTextIcon className="h-5 inline" />} onClick={() => {
                                                // copy personalServiceAccount.token to clipboard
                                                
                                                navigator.clipboard.writeText(createKubeConfig(personalServiceAccount.ca, clusterInfo.clusterApi, personalServiceAccount.name, personalServiceAccount.token));
                                                DefaultAlertMessage("Success", "Kubeconfig copied to clipboard", AlertType.Success);
                                            }} />
                                        </div>
                                    </div>
                                ) : null
                            }
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default PersonalServiceAccount;