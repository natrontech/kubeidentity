package k8s

import (
	"strconv"

	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GetTotalNamespaces() (string, error) {

	if Clientset != nil {
		namespaces, err := Clientset.CoreV1().Namespaces().List(Ctx, metav1.ListOptions{})
		if err != nil {
			return "", err
		}
		var totalNamespaces int
		totalNamespaces = len(namespaces.Items)
		return strconv.Itoa(totalNamespaces), nil
	}

	return "unknown", nil
}

func CreateNamespace(namespace string) error {
	ns := &v1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: namespace,
			Labels: map[string]string{
				"kubeidentity": "true",
				"name":         namespace,
			},
		},
	}
	_, err := Clientset.CoreV1().Namespaces().Create(Ctx, ns, metav1.CreateOptions{})
	return err
}

func DeleteNamespace(namespace string) error {
	return Clientset.CoreV1().Namespaces().Delete(Ctx, namespace, metav1.DeleteOptions{})
}
