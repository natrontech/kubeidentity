package k8s

import (
	"encoding/json"
	"errors"
	"strconv"
	"strings"
	"time"

	"github.com/natrongmbh/kubeidentity/models"
	"github.com/natrongmbh/kubeidentity/util"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GetMatchingServiceAccountsByGithubUserID(githubUser models.GithubUser) (models.ServiceAccount, error) {

	serviceAccountName := githubUser.Login + "-" + strconv.Itoa(int(githubUser.ID))

	serviceAccount, err := GetServiceAccount(serviceAccountName)
	if err != nil {
		return models.ServiceAccount{}, err
	}

	return serviceAccount, nil
}

func GetServiceAccount(name string) (models.ServiceAccount, error) {

	serviceAccountLister := Clientset.CoreV1().ServiceAccounts(util.ConfigNamespace)
	serviceAccount, err := serviceAccountLister.Get(Ctx, name, metav1.GetOptions{})
	if err != nil {
		if strings.Contains(err.Error(), "not found") {
			serviceAccount, err = CreateServiceAccount(name)
			if err != nil {
				return models.ServiceAccount{}, err
			}
		} else {
			return models.ServiceAccount{}, err
		}
	}

	var tempServiceAccount models.ServiceAccount

	// try 5 times (because of race conditions)
	for i := 0; i < 5; i++ {
		util.InfoLogger.Println("Trying to get service account token %i. time", i)

		secrets, _ := GetSecretsInNamespace()
		for _, secret := range secrets.Items {
			if secret.Annotations["kubernetes.io/service-account.name"] == name {
				tempServiceAccount = models.ServiceAccount{
					Name:      serviceAccount.Name,
					Namespace: serviceAccount.Namespace,
					Token:     string(secret.Data["token"]),
				}
			}
		}
		if tempServiceAccount != (models.ServiceAccount{}) {
			break
		}
		time.Sleep(time.Millisecond * 50)
	}

	if tempServiceAccount == (models.ServiceAccount{}) {
		return models.ServiceAccount{}, errors.New("Could not get service account token")
	}

	return tempServiceAccount, nil
}

func CreateServiceAccount(serviceAccountName string) (*v1.ServiceAccount, error) {

	serviceAccount := &v1.ServiceAccount{
		ObjectMeta: metav1.ObjectMeta{
			Name: serviceAccountName,
		},
	}

	createdServiceAccount, err := Clientset.CoreV1().ServiceAccounts(util.ConfigNamespace).Create(Ctx, serviceAccount, metav1.CreateOptions{})
	if err != nil {
		return &v1.ServiceAccount{}, err
	}

	return createdServiceAccount, nil
}

// OLD CODE, useful for reference

func GetMatchingServiceAccountsByGithubTeam(githubUser models.GithubUser) ([]models.ServiceAccount, error) {

	serviceAccounts, err := GetServiceAccounts(util.ConfigNamespace)
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
