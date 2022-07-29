import { DotsVerticalIcon, PlusIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import { forwardRef, useImperativeHandle, useState } from "react";
import { classNames } from "../../lib/design";
import { AdminOverviewTeam, ClusterRole, Role } from "./AdminOverview";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import Button, { ButtonType } from "../general/Button";
import Api from "../../config/Api";

const sampleAdminClusterRoles: Array<ClusterRole> = [
    {
        metadata: {
            name: 'cluster-admin',
            labels: {
                'kubeidentity.io/github-organization': 'natrongmbh',
                'kubeidentity.io/github-team': 'admins'
            }
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
            labels: {
                'kubeidentity.io/github-organization': 'natrongmbh',
            }
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
            labels: {
                'kubeidentity.io/github-organization': 'natrongmbh',
                'kubeidentity.io/github-team': 'admins'
            },
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



    const filteredNamespaceAdminRoles =
        query === ''
            ? sampleNamespaceAdminRoles
            : sampleNamespaceAdminRoles.filter((sampleNamespaceAdminRole) => {
                return sampleNamespaceAdminRole.metadata.name.toLowerCase().includes(query.toLowerCase())
            })

    const notAssignedClusterRoles = sampleAdminClusterRoles.filter((sampleAdminClusterRole) => {
        // check if label 'kubeidentity.io/github-team' exists and has not value of team.name
        if (team) {
            //@ts-ignore
            return sampleAdminClusterRole.metadata.labels['kubeidentity.io/github-team'] != team.slug
        }
    })

    const assginedClusterRoles = sampleAdminClusterRoles.filter((sampleAdminClusterRole) => {
        // check if label 'kubeidentity.io/github-team' exists and has value of team.name
        if (team) {
            //@ts-ignore
            return sampleAdminClusterRole.metadata.labels['kubeidentity.io/github-team'] == team.slug
        }
    })

    const filteredClusterRoles =
        query === ''
            ? assginedClusterRoles
            : assginedClusterRoles.filter((sampleAdminClusterRole) => {
                return sampleAdminClusterRole.metadata.name.toLowerCase().includes(query.toLowerCase())
            })

    const handleAssignClusterRole = (clusterRole: ClusterRole) => {
        Api
    }

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
                className="bg-white w-4/5 sm:h-3/5 h-4/5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll scrollbar-hide"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <XIcon className="absolute top-0 right-0 m-2 h-10 w-10 cursor-pointer sm:hover:scale-105 transition-all duration-150 ease-in-out" onClick={() => { setIsOpen(!isOpen) }} />
                <div
                    className="flex-row items-center justify-center p-4 sm:px-48"
                >
                    <h1
                        className="text-2xl font-bold text-center col-span-2"
                    >
                        {
                            team && team.name
                        }
                    </h1>

                    <div
                        className="border border-gray-200 rounded-lg p-4 mt-10"
                    >
                        <h1
                            className="text-lg font-bold text-center col-span-2"
                        >
                            Cluster Roles
                        </h1>
                        <div>
                            <h2 className="text-gray-500 text-xs font-medium tracking-wide">Assigned</h2>
                            <ul role="list" className="mt-3 flex gap-5 flex-row flex-wrap">
                                {notAssignedClusterRoles.map((notAssignedClusterRole) => (
                                    <li key={notAssignedClusterRole.metadata.name} className="flex sm:w-auto w-full shadow-sm border-2 rounded-md">

                                        <div className="flex items-center justify-between ">
                                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                                <p className="text-gray-900 font-medium hover:text-gray-600">
                                                    {notAssignedClusterRole.metadata.name}
                                                </p>
                                                {/* <p className="text-gray-500">{notAssignedClusterRole.metadata.name} Members</p> */}
                                            </div>
                                            <div className="flex-shrink-0 pr-2">
                                                <button
                                                    type="button"
                                                    className="w-8 h-8 bg-white inline-flex items-center justify-center text-primary"
                                                >
                                                    <span className="sr-only">Open options</span>
                                                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <hr
                            className="my-10"
                        />
                        <div
                            className="flex sm:flex-row flex-col gap-4"
                        >
                            <Combobox as="div" className="sm:w-3/5 w-full" value={selectedClusterRole} onChange={setSelectedClusterRole}>

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
                                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
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

                            <Button buttonType={ButtonType.Primary} buttonText="Add" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default EditSpecificTeamModal;