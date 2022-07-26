package main

import (
	"context"
	"flag"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/natrongmbh/kubeidentity/k8s"
	"github.com/natrongmbh/kubeidentity/routes"
	"github.com/natrongmbh/kubeidentity/util"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/flowcontrol"
	"k8s.io/client-go/util/homedir"
)

func init() {
	util.InitLoggers()
	util.Status = "OK"

	if err := util.LoadEnv(); err != nil {
		util.ErrorLogger.Println("Error loading environment variables:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}

	argsWithoutProg := os.Args[1:]
	if len(argsWithoutProg) > 0 {
		switch argsWithoutProg[0] {
		case "local":
			// Local development
			var kubeconfig *string
			if home := homedir.HomeDir(); home != "" {
				kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
			} else {
				kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
			}
			flag.Parse()

			config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
			if err != nil {
				panic(err)
			}
			k8s.Kubeconfig = config
		case "cluster":
			// Inside a kubernetes cluster
			config, err := rest.InClusterConfig()
			if err != nil {
				util.ErrorLogger.Println("Error getting in cluster config:", err)
				util.Status = "ERROR"
				os.Exit(1)
			}
			k8s.Kubeconfig = config
		default:
			util.ErrorLogger.Println("Invalid argument:", argsWithoutProg[0])
			util.Status = "ERROR"
			os.Exit(1)

		}
	}

	var err error

	k8s.DiscoveryClient, err = discovery.NewDiscoveryClientForConfig(k8s.Kubeconfig)
	if err != nil {
		util.ErrorLogger.Println("Error getting discovery client:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}

	k8s.Ctx = context.Background()

	k8s.Kubeconfig.RateLimiter = flowcontrol.NewTokenBucketRateLimiter(20, 50)

	k8s.Clientset, err = kubernetes.NewForConfig(k8s.Kubeconfig)
	if err != nil {
		util.ErrorLogger.Println("Error creating clientset:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}

	// check if namespace kubeidentity exists
	// if not, create it
	_, err = k8s.Clientset.CoreV1().Namespaces().Get(k8s.Ctx, util.ConfigNamespace, metav1.GetOptions{})
	if err != nil {
		err := k8s.CreateNamespace(util.ConfigNamespace)
		if err != nil {
			util.ErrorLogger.Println("Error creating namespace:", err)
			util.Status = "ERROR"
			os.Exit(1)
		}
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

	util.InfoLogger.Println("Starting KubeIdentity REST Backend...")

	if err := app.Listen(":8000"); err != nil {
		util.ErrorLogger.Println("Error starting server:", err)
		util.Status = "ERROR"
		os.Exit(1)
	}
}
