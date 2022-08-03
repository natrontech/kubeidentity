package k8s

import (
	"github.com/natrongmbh/kubeidentity/util"
	v1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func CreateClusterRoleBinding(clusterRole string, serviceAccountName string) error {
	clusterRoleBinding := &v1.ClusterRoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Name: serviceAccountName,
		},
		Subjects: []v1.Subject{
			{
				Kind:      "ServiceAccount",
				Name:      serviceAccountName,
				Namespace: util.ConfigNamespace,
			},
		},
		RoleRef: v1.RoleRef{
			Kind: "ClusterRole",
			Name: clusterRole,
		},
	}
	_, err := Clientset.RbacV1().ClusterRoleBindings().Create(Ctx, clusterRoleBinding, metav1.CreateOptions{})
	if err != nil {
		return err
	}
	return nil
}
