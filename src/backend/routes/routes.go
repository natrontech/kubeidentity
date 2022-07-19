package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubeperm/controllers"
)

// Routes - Define all routes
func Setup(app *fiber.App) {

	api := app.Group("/api")
	v1 := api.Group("/v1")

	// Auth
	v1.Post("/auth/github", controllers.FrontendGithubLogin)
	v1.Get("/auth/github", controllers.CheckGithubLogin)
	v1.Get("/auth/github/callback", controllers.GithubCallback)

	// API
}
