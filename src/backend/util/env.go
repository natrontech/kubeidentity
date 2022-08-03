package util

import (
	"errors"
	"os"
)

var (
	err                error
	CORS               string
	ConfigNamespace    string
	DefaultClusterRole string
)

// LoadEnv loads OS environment variables
func LoadEnv() error {
	// Load environment variables
	if CORS = os.Getenv("CORS"); CORS == "" {
		InfoLogger.Println("CORS not set, defaulting to '*'")
		CORS = "*"
	}

	if GITHUB_CALLBACK_URL = os.Getenv("GITHUB_CALLBACK_URL"); GITHUB_CALLBACK_URL == "" {
		WarningLogger.Println("GITHUB_CALLBACK_URL not set")
		GITHUB_CALLBACK_URL = "http://localhost:8000/auth/github/callback"
	}

	if GITHUB_CLIENT_ID = os.Getenv("GITHUB_CLIENT_ID"); GITHUB_CLIENT_ID == "" {
		return errors.New("GITHUB_CLIENT_ID not set")
	}

	if GITHUB_CLIENT_SECRET = os.Getenv("GITHUB_CLIENT_SECRET"); GITHUB_CLIENT_SECRET == "" {
		return errors.New("GITHUB_CLIENT_SECRET not set")
	}

	if GITHUB_ORGANIZATION = os.Getenv("GITHUB_ORGANIZATION"); GITHUB_ORGANIZATION == "" {
		return errors.New("GITHUB_ORGANIZATION not set")
	}

	if ConfigNamespace = os.Getenv("KUBEIDENTITY_NAMESPACE"); ConfigNamespace == "" {
		InfoLogger.Println("KUBEIDENTITY_NAMESPACE not set, defaulting to 'kubeidentity'")
		ConfigNamespace = "kubeidentity"
	}

	if DefaultClusterRole = os.Getenv("DEFAULT_CLUSTER_ROLE"); DefaultClusterRole == "" {
		InfoLogger.Println("DEFAULT_CLUSTER_ROLE not set, defaulting to 'cluster-admin'")
		DefaultClusterRole = "cluster-admin"
	}

	return nil
}
