package main

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/redirect/v2"
	"github.com/natrongmbh/kubeperm/routes"
	"github.com/natrongmbh/kubeperm/util"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/util/flowcontrol"
)

func init() {
	util.InitLoggers()
	util.Status = "OK"

	config, err := rest.InClusterConfig()
	if err != nil {
		util.ErrorLogger.Println("Error getting in cluster config:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}
	util.Kubeconfig = config

	config.RateLimiter = flowcontrol.NewTokenBucketRateLimiter(20, 50)

	util.Clientset, err = kubernetes.NewForConfig(config)
	if err != nil {
		util.ErrorLogger.Println("Error creating clientset:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}

	if err := util.LoadEnv(); err != nil {
		util.ErrorLogger.Println("Error loading environment variables:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}
}

func main() {
	app := fiber.New(fiber.Config{})

	app.Use(cors.New(cors.Config{
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowCredentials: true,
		AllowOrigins:     util.CORS,
	}))

	app.Static("/", "./public", fiber.Static{
		Index:         "index.html",
		Compress:      true,
		ByteRange:     true,
		Browse:        true,
		CacheDuration: 10 * time.Second,
		MaxAge:        3600,
	})

	app.Use(redirect.New(redirect.Config{
		Rules: map[string]string{
			"/": "/index.html",
		},
	}))

	routes.Setup(app)

	util.InfoLogger.Println("Starting kubeperm...")

	if err := app.Listen(":8000"); err != nil {
		util.ErrorLogger.Println("Error starting server:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}
}
