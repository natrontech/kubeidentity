package models

type GithubUser struct {
	ID                 float64  `json:"id"`
	Login              string   `json:"login"`
	Email              string   `json:"email"`
	Name               string   `json:"name"`
	AvatarURL          string   `json:"avatar_url"`
	GithubTeamSlugs    []string `json:"github_team_slugs"`
	GithubAccessToken  string   `json:"github_access_token"`
	GithubOrganization string   `json:"github_organization"`
	Is_Admin           bool     `json:"is_admin"`
}
