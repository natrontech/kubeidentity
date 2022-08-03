

export function createKubeConfig(ca: string, clusterApi: string, serviceAccountName: string, serviceAccountToken: string): string {
    const kubeconfig: string =
`apiVersion: v1
kind: Config
clusters:
- name: kubeidentity-cluster
  cluster:
    certificate-authority-data: ${ca}
    server: ${clusterApi}
contexts:
- name: kubeidentity-context
  context:
    cluster: kubeidentity-cluster
    namespace: default
    user: ${serviceAccountName}
current-context: kubeidentity-context
users:
- name: ${serviceAccountName}
  user:
    token: ${serviceAccountToken}
`
    return kubeconfig
}