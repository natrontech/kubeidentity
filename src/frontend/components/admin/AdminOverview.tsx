import { ExternalLinkIcon, PencilAltIcon, PencilIcon } from "@heroicons/react/outline";
import { useRef } from "react";
import { classNames } from "../../lib/design";
import Button, { ButtonType } from "../general/Button";
import EditSpecificTeamModal from "./EditSpecificTeamModal";

export interface Label {
    [key: string]: string;
}

export interface ClusterRole {
    metadata: {
        name: string;
        labels: Label;
    },
    rules: [
        {
            apiGroups: [string],
            resources: [string],
            verbs: [string]
        }
    ]
}

export interface Role {
    metadata: {
        name: string;
        labels: Label;
        namespace: string
    },
    rules: [
        {
            apiGroups: [string],
            resources: [string],
            verbs: [string]
        }
    ]
}

export interface AdminOverviewTeam {
    id: number,
    name: string,
    slug: string,
    html_url: string,
    github_permission: string,
    cluster_roles: Array<ClusterRole>,
    roles: Array<Role>
}

const sampleAdminClusterRole: ClusterRole = {
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
}

const sampleNamespaceAdminRole: Role = {
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

const teams: Array<AdminOverviewTeam> = [
    {
        id: 1,
        name: 'Admins',
        slug: 'admins',
        html_url: 'https://github.com/orgs/natrongmbh/teams/admins',
        github_permission: 'admin',
        cluster_roles: [
            sampleAdminClusterRole
        ],
        roles: [
            sampleNamespaceAdminRole
        ]

    },
    {
        id: 1,
        name: 'Adminss',
        slug: 'admins',
        html_url: 'https://github.com/orgs/natrongmbh/teams/admins',
        github_permission: 'admin',
        cluster_roles: [
            sampleAdminClusterRole
        ],
        roles: [
            sampleNamespaceAdminRole
        ]

    },
]

const AdminOverview = () => {

    const editSpecificTeamModalRef = useRef()


    const handleOnClickEditClusterRoles = () => {
        console.log('handleOnClickEditClusterRoles')
    }

    const handleOnClickEditRoles = () => {
        console.log('handleOnClickEditRoles')
    }

    return (
        <div
            className="sm:top-32 lg:w-4/5 xl:w-3/5 sm:w-4/5 w-full mx-auto bg-opacity-90 sm:bg-white sm:rounded-lg sm:shadow-lg p-10"
        >
            <EditSpecificTeamModal ref={editSpecificTeamModalRef} />
            <div className="px-0 sm:px-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-GilroyBold text-primary">Administration</h1>
                        <p className="mt-2 text-sm text-black">
                            Administrate your Github teams permissions.
                            Either assign them <strong className="font-GilroyBold text-primary">Cluster Roles</strong> or <strong className="font-GilroyBold text-primary">Roles</strong>.
                            The difference is that Cluster Roles are assigned to the whole cluster, while Roles are assigned to a specific namespace.
                            You can also create or delete these Cluster Roles and Roles.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 w-full">

                        <div
                            className="grid gap-4"
                        >
                            <div
                                className="relative"
                            >
                                <Button buttonType={ButtonType.Primary} widthString="w-48" buttonText="Cluster Roles" buttonIcon={<PencilAltIcon className="w-5 h-5 inline-block" />} onClick={handleOnClickEditClusterRoles} />

                            </div>
                            <div>
                                <Button buttonType={ButtonType.Primary} widthString="w-48" buttonText="Roles" buttonIcon={<PencilAltIcon className="w-5 h-5 inline-block" />} onClick={handleOnClickEditRoles} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className=" mt-10 border  rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-GilroyBold text-primary sm:pl-6">
                                    Github Team <ExternalLinkIcon className="h-5 w-5 inline-block" />
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-GilroyBold text-primary lg:table-cell"
                                >
                                    Github Permission
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-GilroyBold text-primary lg:table-cell"
                                >
                                    Cluster Roles
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-GilroyBold text-primary lg:table-cell"
                                >
                                    Roles (Namespace)
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Select</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, teamIdx) => (
                                <tr key={team.id}>
                                    <td
                                        className={classNames(
                                            teamIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                        )}
                                    >
                                        <div className="text-black sm:hover:text-primary transition-all duration-150 ease">
                                            <a
                                                href={team.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {team.name}
                                            </a>
                                        </div>
                                        {teamIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                                    </td>
                                    <td
                                        className={classNames(
                                            teamIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {team.github_permission}
                                    </td>
                                    <td
                                        className={classNames(
                                            teamIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {
                                            team.cluster_roles.map((clusterRole, clusterRoleIdx) => (
                                                <div key={clusterRoleIdx}>
                                                    <span className="text-gray-500">{clusterRole.metadata.name}</span>
                                                    {clusterRoleIdx !== team.cluster_roles.length - 1 ? <span className="text-gray-500">,</span> : null}
                                                </div>
                                            ))
                                        }
                                    </td>
                                    <td
                                        className={classNames(
                                            teamIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {
                                            team.roles.map((role, roleIdx) => (
                                                <div key={roleIdx}>
                                                    <div className="text-gray-500">{role.metadata.name}{roleIdx !== team.roles.length - 1 ? <span className="text-gray-500">,</span> : null}</div>
                                                    <div className="text-primary text-xs -mt-1">({role.metadata.name})</div>
                                                </div>
                                            ))
                                        }
                                    </td>
                                    <td
                                        className={classNames(
                                            teamIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm'
                                        )}
                                    >
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border-2 border-primary bg-white px-4 py-2 text-sm font-GilroyMedium leading-4 text-primary shadow-sm hover:bg-primary hover:text-white transition-all duration-150 ease "
                                            //@ts-ignore
                                            onClick={() => editSpecificTeamModalRef.current.open(team)}
                                        >
                                            <PencilIcon className="h-5 w-5 inline-block" />
                                        </button>
                                        {teamIdx !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default AdminOverview;