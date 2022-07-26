package k8s

import (
	"github.com/natrongmbh/kubeidentity/util"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GetSecretsInNamespace() (*v1.SecretList, error) {
	secrets, err := Clientset.CoreV1().Secrets(util.ConfigNamespace).List(Ctx, metav1.ListOptions{})
	if err != nil {
		return &v1.SecretList{}, err
	}
	return secrets, nil
}
