import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, FingerPrintIcon, LinkIcon, SelectorIcon, UserAddIcon, UserIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Api from "../../config/Api";
import { usePersonalServiceAccountContext } from "../../contexts/personalServiceAccountContext";
import { useUserContext } from "../../contexts/userContext";
import { classNames } from "../../lib/design";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Button, { ButtonType } from "../general/Button";

const PersonalServiceAccount = () => {

    interface PersonalServiceAccountInterface {
        name: string;
        namespace: string;
        token: string;
    }

    const [personalServiceAccounts, setPersonalServiceAccounts] = useState<PersonalServiceAccountInterface[]>([
        {
            name: "Select Personal Service Account",
            namespace: "none",
            token: ""
        }
    ]);

    const { personalServiceAccount, setPersonalServiceAccount }: any = usePersonalServiceAccountContext();

    const [loadingPersonalServiceAccounts, setLoadingPersonalServiceAccounts] = useState(true);

    const { loading, user }: any = useUserContext();

    useEffect(() => {
        (
            async () => {
                if (!loading && user) {
                    try {
                        const { data } = await Api.get("/personal-service-account");
                        if (data) {
                            setPersonalServiceAccounts(data);
                        }
                        setLoadingPersonalServiceAccounts(false);
                    } catch (error) {
                        console.log(error);
                        DefaultAlertMessage("Error", "Could not get Personal Service Account Data", AlertType.Error);
                        setLoadingPersonalServiceAccounts(false);
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
                    <UserIcon className="inline-block h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg leading-6  text-gray-900">Personal Service Account</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Select your Personal Kubernetes Service Account</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 font-GilroyMedium sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                            {
                                personalServiceAccounts.length > 0 && personalServiceAccounts[0].namespace != "" && !loadingPersonalServiceAccounts ? (
                                    <Listbox value={personalServiceAccount} onChange={setPersonalServiceAccount}>
                                        {({ open }) => (
                                            <>
                                                <div className="mt-1 relative">
                                                    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none sm:text-sm">
                                                        <span className="block truncate">{personalServiceAccount ? personalServiceAccount.name : "Select Personal Service Account"}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                            {personalServiceAccounts.map((pSA) => (
                                                                <Listbox.Option
                                                                    key={pSA.name}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'text-white bg-primary' : 'text-gray-900',
                                                                            'cursor-pointer select-none relative py-2 pl-3 pr-9'
                                                                        )
                                                                    }
                                                                    value={pSA}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                {pSA.name}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? 'text-white' : 'text-primary',
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                ) : !loadingPersonalServiceAccounts ? (
                                    <Button buttonType={ButtonType.PrimaryOutline} buttonText="Create Personal Service Account" buttonIcon={<UserAddIcon className="h-6 inline" />} />
                                ) : null
                            }

                            {
                                personalServiceAccount && personalServiceAccount.namespace != "" ? (
                                    <div
                                        className="mt-5"
                                    >
                                        <Button buttonType={ButtonType.PrimaryOutline} buttonText="Get Personal Access Token" buttonIcon={<FingerPrintIcon className="h-6 inline" />} onClick={() => {
                                        // copy personalServiceAccount.token to clipboard
                                        navigator.clipboard.writeText(personalServiceAccount.token);
                                        DefaultAlertMessage("Success", "Personal Service Account Token copied to clipboard", AlertType.Success);
                                    }}  />
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