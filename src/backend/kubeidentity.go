package main

import (
	"context"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/natrongmbh/kubeperm/routes"
	"github.com/natrongmbh/kubeperm/util"

	"k8s.io/client-go/discovery"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/util/flowcontrol"
)

func init() {
	util.InitLoggers()
	util.Status = "OK"

	// Inside a kubernetes cluster
	config, err := rest.InClusterConfig()
	if err != nil {
		util.ErrorLogger.Println("Error getting in cluster config:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}

	// Local development
	// var kubeconfig *string
	// if home := homedir.HomeDir(); home != "" {
	// 	kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
	// } else {
	// 	kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	// }
	// flag.Parse()

	// config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	// if err != nil {
	// 	panic(err)
	// }

	util.Kubeconfig = config

	util.DiscoveryClient, err = discovery.NewDiscoveryClientForConfig(config)
	if err != nil {
		util.ErrorLogger.Println("Error getting discovery client:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}

	util.Ctx = context.Background()

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

	routes.Setup(app)

	util.InfoLogger.Println("Starting kubeperm...")

	if err := app.Listen(":8000"); err != nil {
		util.ErrorLogger.Println("Error starting server:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}
}
