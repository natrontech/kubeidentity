package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubeperm/util"
)

func GetClusterInfo(c *fiber.Ctx) error {

	clusterApi, err := util.GetClusterApi()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting cluster name",
		})
	}

	clusterVersion, err := util.GetClusterVersion()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting cluster version",
		})
	}

	totalNamespaces, err := util.GetTotalNamespaces()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting total namespaces",
		})
	}

	totalPods, err := util.GetTotalPods()
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
