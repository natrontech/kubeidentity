import { DotsVerticalIcon, PlusIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import { forwardRef, useImperativeHandle, useState } from "react";
import { classNames } from "../../lib/design";
import { AdminOverviewTeam, ClusterRole, Role } from "./AdminOverview";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import Button, { ButtonType } from "../general/Button";
import Api from "../../config/Api";
import SlideOver from "../general/SlideOver";

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
    },
    {
        metadata: {
            name: 'kube-system-admin2',
            labels: {
                'kubeidentity.io/github-organization': 'natrongmbh',
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
    },
    {
        metadata: {
            name: 'kube-system-admin2',
            labels: {
                'kubeidentity.io/github-organization': 'natrongmbh',
            },
            namespace: 'kube-system2'
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

    const [openSlideOver, setOpenSlideOver] = useState(false)

    useImperativeHandle(ref, () => ({
        open: (teamProp: AdminOverviewTeam) => {
            setIsOpen(!isOpen);
            setTeam(teamProp);
        }
    }));


    const [selectedRole, setSelectedRole] = useState<Role>()

    const notAssignedRoles = sampleNamespaceAdminRoles.filter((sampleNamespaceAdminRole) => {
        // check if label 'kubeidentity.io/github-team' exists and has not value of team.name
        if (team) {
            //@ts-ignore
            return sampleNamespaceAdminRole.metadata.labels['kubeidentity.io/github-team'] != team.slug
        }
    })

    const assginedRoles = sampleNamespaceAdminRoles.filter((sampleNamespaceAdminRole) => {
        // check if label 'kubeidentity.io/github-team' exists and has value of team.name
        if (team) {
            //@ts-ignore
            return sampleNamespaceAdminRole.metadata.labels['kubeidentity.io/github-team'] == team.slug
        }
    })

    const filteredRoles =
        query === ''
            ? notAssignedRoles
            : notAssignedRoles.filter((filteredRole) => {
                return filteredRole.metadata.name.toLowerCase().includes(query.toLowerCase())
            })

    const handleAssignRole = (role: Role) => {
        console.log(role)
    }



    const [selectedClusterRole, setSelectedClusterRole] = useState<ClusterRole>()

    const notAssignedClusterRoles = sampleAdminClusterRoles.filter((sampleAdminClusterRole) => {
        // check if label 'kubeidentity.io/github-team' exists and has not value of team.name
        if (team) {
            //@ts-ignore
            console.log(sampleAdminClusterRole.metadata.labels['kubeidentity.io/github-team'])
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
            ? notAssignedClusterRoles
            : notAssignedClusterRoles.filter((sampleAdminClusterRole) => {
                return sampleAdminClusterRole.metadata.name.toLowerCase().includes(query.toLowerCase())
            })

    const handleAssignClusterRole = (clusterRole: ClusterRole) => {
        console.log(clusterRole)
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
                className="bg-white w-4/5 sm:h-3/5 h-4/5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <XIcon className="fixed top-0 right-0 m-2 h-10 w-10 cursor-pointer sm:hover:scale-105 transition-all duration-150 ease-in-out" onClick={() => { setIsOpen(!isOpen) }} />
                <div
                    className="h-full overflow-y-scroll scrollbar-hide"
                >
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

                            <div
                                className="flex sm:flex-row flex-col gap-4 mt-5"
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
                                                                <span className={classNames('block truncate', selected && '')}>{filteredClusterRole.metadata.name}</span>

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

                            <hr
                                className="my-5"
                            />

                            <div>
                                <h2 className="text-gray-500 text-xs font-medium tracking-wide">Assigned</h2>
                                <ul role="list" className="mt-3 flex gap-5 flex-row flex-wrap">
                                    {assginedClusterRoles.map((assginedClusterRole) => (
                                        <li key={assginedClusterRole.metadata.name} className="relative flex sm:w-auto w-full shadow-sm border-2 rounded-md">

                                            <div className="flex items-center justify-between ">
                                                <div className="flex-1 px-4 py-2 text-sm truncate pr-10">
                                                    <p className="text-gray-900 font-medium hover:text-gray-600">
                                                        {assginedClusterRole.metadata.name}
                                                    </p>
                                                    {/* <p className="text-gray-500">{notAssignedClusterRole.metadata.name} Members</p> */}
                                                </div>
                                                <div className="flex-shrink-0 pr-2">
                                                    <button
                                                        type="button"
                                                        className="w-8 h-8 bg-white inline-flex items-center justify-center text-primary right-2 top-1/2 -translate-y-1/2 absolute "
                                                    >
                                                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>


                        <div
                            className="border border-gray-200 rounded-lg p-4 mt-10"
                        >
                            <h1
                                className="text-lg font-bold text-center col-span-2"
                            >
                                Roles
                            </h1>

                            <div
                                className="flex sm:flex-row flex-col gap-4 mt-5"
                            >
                                <Combobox as="div" className="sm:w-3/5 w-full" value={selectedRole} onChange={setSelectedRole}>

                                    <div className="relative mt-1">
                                        <Combobox.Input
                                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                            onChange={(event) => setQuery(event.target.value)}
                                            displayValue={(Role: Role) => Role?.metadata?.name || 'Select a Role'}
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </Combobox.Button>

                                        {filteredRoles.length > 0 && (
                                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {filteredRoles.map((filteredRole) => (
                                                    <Combobox.Option
                                                        key={filteredRole.metadata.name + filteredRole.metadata.namespace}
                                                        value={filteredRole}
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
                                                                <span className={classNames('block truncate', selected && '')}>{filteredRole.metadata.name}</span>
                                                                <span className="text-xs" >({filteredRole.metadata.namespace})</span>
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

                                <Button buttonType={ButtonType.Primary} buttonText="Add" onClick={() => {
                                    console.log(selectedRole)
                                }} />
                            </div>

                            <hr
                                className="my-5"
                            />

                            <div>
                                <h2 className="text-gray-500 text-xs font-medium tracking-wide">Assigned</h2>
                                <ul role="list" className="mt-3 flex gap-5 flex-row flex-wrap">
                                    {assginedRoles.map((assginedRole) => (
                                        <li key={assginedRole.metadata.name}
                                            className="relative flex sm:w-auto w-full cursor-pointer shadow-sm border-2 rounded-md"
                                            onClick={() => setOpenSlideOver(!openSlideOver)}
                                        >
                                            <SlideOver isOpen={openSlideOver} title={assginedRole.metadata.name}>
                                                
                                            </SlideOver>

                                            <div className="flex items-center justify-between ">
                                                <div className="flex-1 px-4 py-2 text-sm truncate pr-10">
                                                    <p className="text-gray-900 font-medium hover:text-gray-600">
                                                        {assginedRole.metadata.name}
                                                    </p>
                                                    <p className="text-primary">({assginedRole.metadata.namespace})</p>
                                                </div>
                                                <div className="flex-shrink-0 pr-2">
                                                    <button
                                                        type="button"
                                                        className="w-8 h-8 bg-white inline-flex items-center justify-center text-primary right-2 top-1/2 -translate-y-1/2 absolute "
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
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
});

export default EditSpecificTeamModal;