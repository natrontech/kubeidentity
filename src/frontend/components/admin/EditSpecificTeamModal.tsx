import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { forwardRef, useImperativeHandle, useState } from "react";
import { classNames } from "../../lib/design";
import { AdminOverviewTeam, ClusterRole, Role } from "./AdminOverview";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import Button, { ButtonType } from "../general/Button";

const sampleAdminClusterRoles: Array<ClusterRole> = [
    {
        metadata: {
            name: 'cluster-admin',
            labels: [
                {
                    'kubeidentity.io/github-organization': 'natrongmbh'
                },
                {
                    'kubeidentity.io/github-team': 'admins'
                }
            ]
        },
        rules: [
            {
                apiGroups: [
                    '*'
                ],
                resources: [
                    '*'
                ],
                verbs: [
                    '*'
                ]
            }
        ]
    },
    {
        metadata: {
            name: 'cluster-admin2',
            labels: [
                {
                    'kubeidentity.io/github-organization': 'natrongmbh'
                }
            ]
        },
        rules: [
            {
                apiGroups: [
                    '*'
                ],
                resources: [
                    '*'
                ],
                verbs: [
                    '*'
                ]
            }
        ]
    },
]

const sampleNamespaceAdminRoles: Array<Role> = [
    {
        metadata: {
            name: 'kube-system-admin',
            labels: [
                {
                    'kubeidentity.io/github-organization': 'natrongmbh'
                },
                {
                    'kubeidentity.io/github-team': 'admins'
                }
            ],
            namespace: 'kube-system'
        },
        rules: [
            {
                apiGroups: [
                    '*'
                ],
                resources: [
                    '*'
                ],
                verbs: [
                    '*'
                ]
            }
        ]
    }
]

const EditSpecificTeamModal = forwardRef((props: any, ref) => {


    EditSpecificTeamModal.displayName = "EditSpecificTeamModal";

    const [isOpen, setIsOpen] = useState(false);

    const [team, setTeam] = useState<AdminOverviewTeam>();

    const [query, setQuery] = useState('')
    const [selectedClusterRole, setSelectedClusterRole] = useState<ClusterRole>()

    useImperativeHandle(ref, () => ({
        open: (teamProp: AdminOverviewTeam) => {
            setIsOpen(!isOpen);
            setTeam(teamProp);
            console.log(team)
        }
    }));

    const filteredClusterRoles =
        query === ''
            ? sampleAdminClusterRoles
            : sampleAdminClusterRoles.filter((sampleAdminClusterRole) => {
                return sampleAdminClusterRole.metadata.name.toLowerCase().includes(query.toLowerCase())
            })

    const filteredNamespaceAdminRoles =
        query === ''
            ? sampleNamespaceAdminRoles
            : sampleNamespaceAdminRoles.filter((sampleNamespaceAdminRole) => {
                return sampleNamespaceAdminRole.metadata.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div
            className={classNames(
                isOpen ? "z-40 opacity-100" : "opacity-0 -z-10",
                "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 backdrop-blur-md transition-opacity duration-150 ease-in-out",
            )}
            onClick={() => {
                setIsOpen(!isOpen);
            }}
        >
            <div
                className="bg-white w-4/5 sm:h-3/5 h-4/5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <XIcon className="absolute top-0 right-0 m-2 h-10 w-10 cursor-pointer sm:hover:scale-105 transition-all duration-150 ease-in-out" onClick={() => { setIsOpen(!isOpen) }} />
                <div
                    className="flex flex-col items-center justify-center p-4"
                >
                    <h1
                        className="text-2xl font-bold text-center"
                    >
                        {
                            team && team.name
                        }
                    </h1>
                    <p>Add Cluster Role</p>
                        <Combobox as="div" className="w-40" value={selectedClusterRole} onChange={setSelectedClusterRole}>
                            <div className="relative mt-1">
                                <Combobox.Input
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    onChange={(event) => setQuery(event.target.value)}
                                    displayValue={(clusterRole: ClusterRole) => clusterRole?.metadata?.name || 'Select a Cluster Role'}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Combobox.Button>

                                {filteredClusterRoles.length > 0 && (
                                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredClusterRoles.map((filteredClusterRole) => (
                                            <Combobox.Option
                                                key={filteredClusterRole.metadata.name}
                                                value={filteredClusterRole}
                                                className={({ active }) =>
                                                    classNames(
                                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                                        active ? 'bg-primary text-white' : 'text-gray-900'
                                                    )
                                                }
                                            >
                                                {({ active, selected }) => (
                                                    <>
                                                        {/* @ts-ignore */}
                                                        <span className={classNames('block truncate', selected && 'font-semibold')}>{filteredClusterRole.metadata.name}</span>

                                                        {selected && (
                                                            <span
                                                                className={classNames(
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                    active ? 'text-white' : 'text-primary'
                                                                )}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                )}
                            </div>
                        </Combobox>
                        <Button inline={true} buttonType={ButtonType.Primary} buttonText="Add" />
                </div>
            </div>
        </div>
    )
});

export default EditSpecificTeamModal;