package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubeidentity/k8s"
	"github.com/natrongmbh/kubeidentity/util"
)

func GetClusterInfo(c *fiber.Ctx) error {

	util.InfoLogger.Printf("%s %s %s", c.IP(), c.Method(), c.Path())

	githubUser, err := CheckAuth(c)
	if githubUser.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	clusterApi, err := k8s.GetClusterApi()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting cluster name",
		})
	}

	clusterVersion, err := k8s.GetClusterVersion()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting cluster version",
		})
	}

	totalNamespaces, err := k8s.GetTotalNamespaces()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting total namespaces",
		})
	}

	totalPods, err := k8s.GetTotalPods()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting total pods",
		})
	}

	return c.JSON(fiber.Map{
		"clusterApi":      clusterApi,
		"clusterVersion":  clusterVersion,
		"totalNamespaces": totalNamespaces,
		"totalPods":       totalPods,
	})
}

func GetPersonalServiceAccounts(c *fiber.Ctx) error {

	util.InfoLogger.Printf("%s %s %s", c.IP(), c.Method(), c.Path())

	githubUser, err := CheckAuth(c)
	if githubUser.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	serviceAccounts, err := k8s.GetMatchingServiceAccountsByGithubTeam(githubUser)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting service accounts",
		})
	}

	return c.JSON(serviceAccounts)
}
