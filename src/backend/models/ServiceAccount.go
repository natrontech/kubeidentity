package models

type ServiceAccount struct {
	Name      string `json:"name"`
	Namespace string `json:"namespace"`
	Token     string `json:"token"`
}
