package controllers

import "github.com/gofiber/fiber/v2"

func GetClusterInfo(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "OK",
	})
}
