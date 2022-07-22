package util

import (
	"context"
	"strconv"

	"k8s.io/client-go/discovery"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

var (
	Clientset       *kubernetes.Clientset
	Kubeconfig      *rest.Config
	DiscoveryClient *discovery.DiscoveryClient
	Ctx             context.Context
)

func GetClusterApi() (string, error) {
	var clusterName string

	if Kubeconfig != nil {
		clusterName = Kubeconfig.Host
	} else {
		clusterName = "unknown"
	}

	return clusterName, nil
}

func GetClusterVersion() (string, error) {
	if DiscoveryClient != nil {
		clusterVersion, err := DiscoveryClient.ServerVersion()
		if err != nil {
			return "", err
		}
		return clusterVersion.GitVersion, nil
	}

	return "unknown", nil
}

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
