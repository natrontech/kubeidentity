package k8s

import (
	"strconv"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GetTotalPods() (string, error) {

	if Clientset != nil {
		pods, err := Clientset.CoreV1().Pods("").List(Ctx, metav1.ListOptions{})
		if err != nil {
			return "", err
		}
		var totalPods int
		totalPods = len(pods.Items)
		return strconv.Itoa(totalPods), nil
	}

	return "unknown", nil
}
