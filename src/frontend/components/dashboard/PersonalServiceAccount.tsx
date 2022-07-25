import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, LinkIcon, SelectorIcon, UserIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import Api from "../../config/Api";
import { classNames } from "../../lib/design";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";

const PersonalServiceAccount = () => {

    interface PersonalServiceAccountInterface {
        name: string;
        namespace: string;
    }

    const [personalServiceAccounts, setPersonalServiceAccounts] = useState<PersonalServiceAccountInterface[]>([]);
    personalServiceAccounts.push({ name: "* Select A Personal Service Account", namespace: "" });

    const [selected, setSelected] = useState(personalServiceAccounts[0]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await Api.get("/personal-service-account");
                    if (data) {
                        setPersonalServiceAccounts(data);
                    }
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    DefaultAlertMessage("Error", "Could not get Personal Service Account Data", AlertType.Error);
                }
            }
        )()
    }, []);


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
                        <dt className="text-sm text-gray-500">
                            <LinkIcon className="h-5 inline" /> &nbsp; Service account
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label>
                                        <div className="mt-1 relative">
                                            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{selected.name}</span>
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
                                                    {personalServiceAccounts.map((personalServiceAccount) => (
                                                        <Listbox.Option
                                                            key={personalServiceAccount.name}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={personalServiceAccount}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                        {personalServiceAccount.name}
                                                                    </span>

                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'text-white' : 'text-indigo-600',
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
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default PersonalServiceAccount;