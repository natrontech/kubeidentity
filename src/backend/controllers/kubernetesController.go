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

	serviceAccounts, err := k8s.GetServiceAccounts(util.ConfigNamespace)
	totalSAs := len(serviceAccounts)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting total pods",
		})
	}

	return c.JSON(fiber.Map{
		"clusterApi":     clusterApi,
		"clusterVersion": clusterVersion,
		"namespace":      util.ConfigNamespace,
		"totalSAs":       totalSAs,
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

	serviceAccount, err := k8s.GetMatchingServiceAccountsByGithubUserID(githubUser)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
		})
	}

	return c.JSON(serviceAccount)
}
