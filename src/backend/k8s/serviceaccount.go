package k8s

import (
	"encoding/json"

	"github.com/natrongmbh/kubeidentity/models"
	"github.com/natrongmbh/kubeidentity/util"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GetMatchingServiceAccountsByGithubTeam(githubUser models.GithubUser) ([]models.ServiceAccount, error) {

	serviceAccounts, err := GetServiceAccounts("kubeidentity")
	if err != nil {
		return nil, err
	}
	var matchingServiceAccounts []models.ServiceAccount
	githubTeamsData := util.GetGithubTeams(githubUser.GithubAccessToken)
	var githubTeamsDataMap []map[string]interface{}
	if err := json.Unmarshal([]byte(githubTeamsData), &githubTeamsDataMap); err != nil {
		return nil, err
	}

	var githubTeamSlugs []string

	for _, githubTeam := range githubTeamsDataMap {
		githubTeamSlugs = append(githubTeamSlugs, githubTeam["slug"].(string))
	}

	for _, serviceAccount := range serviceAccounts {
		for _, githubTeamSlug := range githubTeamSlugs {
			if serviceAccount.Name == githubTeamSlug {
				matchingServiceAccounts = append(matchingServiceAccounts, serviceAccount)
			}
		}
	}

	return matchingServiceAccounts, err
}

func GetServiceAccounts(namespace string) ([]models.ServiceAccount, error) {

	serviceAccountLister := Clientset.CoreV1().ServiceAccounts(namespace)
	serviceAccounts, err := serviceAccountLister.List(Ctx, metav1.ListOptions{})
	if err != nil {
		return nil, err
	}

	// get every secret in the namespace
	secretLister := Clientset.CoreV1().Secrets(namespace)
	secrets, err := secretLister.List(Ctx, metav1.ListOptions{})
	if err != nil {
		return nil, err
	}

	var serviceAccountsList []models.ServiceAccount
	for _, serviceAccount := range serviceAccounts.Items {

		for _, secret := range secrets.Items {
			if secret.Type == "kubernetes.io/service-account-token" && secret.Namespace == serviceAccount.Namespace {
				if secret.Annotations["kubernetes.io/service-account.name"] == serviceAccount.Name {
					serviceAccountsList = append(serviceAccountsList, models.ServiceAccount{
						Name:      serviceAccount.Name,
						Namespace: serviceAccount.Namespace,
						Token:     string(secret.Data["token"]),
					})
				}
			}
		}
	}

	return serviceAccountsList, nil
}
