package util

import (
	"log"
	"os"
)

var (
	WarningLogger *log.Logger
	InfoLogger    *log.Logger
	ErrorLogger   *log.Logger
	Status        string
	MAX_REQUESTS  int
)

// InitLoggers initializes the loggers
func InitLoggers() {
	// Convenience logger for warning, info and error messages
	InfoLogger = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
	WarningLogger = log.New(os.Stdout, "WARNING: ", log.Ldate|log.Ltime|log.Lshortfile)
	ErrorLogger = log.New(os.Stderr, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
}

// GetStatus returns the status of the application startup
func GetStatus() string {
	return Status
}
