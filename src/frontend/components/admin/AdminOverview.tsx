import { ExternalLinkIcon, PencilAltIcon, PencilIcon } from "@heroicons/react/outline";
import { classNames } from "../../lib/design";
import { LinkIcon } from "../../lib/Icons";
import Button, { ButtonType } from "../general/Button";

const teams = [
    {
        id: 1,
        name: 'Admins',
        slug: 'admins',
        html_url: 'https://github.com/orgs/natrongmbh/teams/admins',
        permission: 'admin',
        cluster_roles: [
            {
                metadata: {
                    name: 'admins',
                    labels: {
                        'kubeidentity.io/github-organization': 'natrongmbh',
                        'kubeidentity.io/github-teams': [
                            'admins'
                        ]
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
        ],
        roles: [
            {
                metadata: {
                    name: 'admins',
                    labels: {
                        'kubeidentity.io/github-organization': 'natrongmbh',
                        'kubeidentity.io/github-teams': [
                            'admins'
                        ]
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

    },
]

const AdminOverview = () => {


    const handleOnClickEditClusterRoles = () => {
        console.log('handleOnClickEditClusterRoles')
    }

    const handleOnClickEditRoles = () => {
        console.log('handleOnClickEditRoles')
    }


    return (
        <div
            className="absolute top-32 sm:left-1/2 sm:-translate-x-1/2  sm:w-4/6 w-full bg-opacity-90 sm:bg-white sm:rounded-lg sm:shadow-lg p-10"
        >
            {/* TODO add a view for each team of the organization where the admin can add predefined Cluster Role Bindings or apply them customly via yaml */}
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
                                        {team.permission}
                                    </td>
                                    <td
                                        className={classNames(
                                            teamIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {
                                            // team.cluster_role_bindings.map((clusterRoleBinding, clusterRoleBindingIdx) => (
                                            //     <div key={clusterRoleBindingIdx}>
                                            //         <div className="flex items-center">
                                            //             <div className="flex-shrink-0">
                                            //                 {clusterRoleBinding.cluster_role_binding.cluster_role.name}
                                            //                 {team.cluster_role_bindings.length != clusterRoleBindingIdx + 1 ? "," : null}
                                            //             </div>
                                            //         </div>
                                            //     </div>
                                            // ))
                                        }
                                    </td>
                                    <td
                                        className={classNames(
                                            teamIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                        )}
                                    >

                                    </td>
                                    <td
                                        className={classNames(
                                            teamIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm'
                                        )}
                                    >
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border-2 border-primary bg-white px-4 py-2 text-sm font-medium leading-4 text-primary shadow-sm hover:bg-primary hover:text-white transition-all duration-150 ease "
                                        // disabled={plan.isCurrent}
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