package k8s

import (
	"context"

	"k8s.io/client-go/discovery"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

var (
	Clientset       *kubernetes.Clientset
	Kubeconfig      *rest.Config
	DiscoveryClient *discovery.DiscoveryClient
	Ctx             context.Context
)

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

func GetClusterApi() (string, error) {
	var clusterName string

	if Kubeconfig != nil {
		clusterName = Kubeconfig.Host
	} else {
		clusterName = "unknown"
	}

	return clusterName, nil
}
