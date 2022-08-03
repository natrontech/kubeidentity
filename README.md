<p align="center">
    <a href="https://natron.io/">
        <img height="120px" src="assets/kubeidentity_logo_color.png" />
    </a>
    <h1 align="center">
        KubeIdentity
    </h1>
</p>

<p align="center">
  <strong>
    A <br />
    <a href="https://beer.gigu.io/">OAuth Connector</a>
    <br />
    for handling GitHub OAuth in your Kubernets cluster.
  </strong>
</p>

<p align="center">
  <a href="https://github.com/natrongmbh/kubeidentity/issues"><img
    src="https://img.shields.io/github/issues/natrongmbh/kubeidentity"
    alt="Build"
  /></a>
  <a href="https://github.com/sponsors/janlauber"><img
    src="https://img.shields.io/github/sponsors/janlauber" 
    alt="Sponsors"
  /></a>
  <a href="https://github.com/natrongmbh/kubeidentity"><img 
    src="https://img.shields.io/github/license/natrongmbh/kubeidentity" 
    alt="License"
  /></a>
  <a href="https://www.codefactor.io/repository/github/natrongmbh/kubeidentity"><img 
    src="https://www.codefactor.io/repository/github/natrongmbh/kubeidentity/badge" 
    alt="CodeFactor" 
  /></a>
</p>

<p align="center">
  KubeIdentity allowes you to create and manage Kubernetes Service Accounts with RBAC based on the OAuth GitHub Team membership.
</p>

<p align="center">
  <em>
    Check out the company behind KuberPerm – 
    <a
      href="https://natron.io/"
    >https://natron.io</a>
  </em>
</p>

<h2></h2>
<p>&nbsp;</p>

## Everything you would expect

### It's a simple web app

You can deploy it inside your Kubernetes cluster.  
Make sure to create a Github OAuth client in your GitHub organization.  
It will be used to authenticate your users.  
The web app will then show you the list of teams you are a member of.  
When you sign in, it will automatically create a Service Account (default namespace: kubeidentity) for you.
And it will create RBAC rules for you (default cluster role binding: edit).

### It's free

Everything is free.  
If you want to support us, you can buy us a beer with a Github Sponsorship or contribute some code.

### Open Source

Trust me, I'm open source.  
You can find the source code on [Github](https://github.com/natrongmbh/kubeidentity).  
The frontend is written in Next.js and the backend in GoLang.  
License: Apache 2.0

<h2></h2>
<p>&nbsp;</p>

## Setup

You can deploy KubeIdentity in your Kubernetes cluster, but you have to set all the env variables.

- [kubernetes-example](/kubernetes/)


### Environment Variables

#### Frontend

- `ENV_GITHUB_CLIENT_ID` (required): Set the GitHub client ID.
- `ENV_GITHUB_REDIRECT_URI` (required): Set the GitHub redirect URI. (e.g. `https://<url-from-frontend>`)
- `ENV_GITHUB_OAUTH_URI` (required): Set the GitHub OAuth URI. (e.g. `https://<url-from-backend>/api/auth/github`)

#### Backend

- `CORS` (optional): Set CORS headers for the API.  
  Default: `*`
- `JWT_SECRET_KEY` (optional): Set the JWT secret key.  
  Default: random string of 32 characters.
- `GITHUB_CALLBACK_URL` (optional): Set the callback URL for the GitHub OAuth.  
  Default: `http://localhost:8000/auth/github/callback`
- `GITHUB_CLIENT_ID` (required): Set the GitHub client ID.
- `GITHUB_CLIENT_SECRET` (required): Set the GitHub client secret.
- `GITHUB_ORGANIZATION` (required): Set the GitHub organization.
- `KUBEIDENTITY_NAMESPACE` (optional): Set the Kubernetes namespace, where the Service Accounts will be created. (it will be created if it doesn't exist)  
  Default: `kubeidentity`
- `DEFAULT_CLUSTER_ROLE` (optional): Set the default cluster role which gets assigned to every ServiceAccount.  
  Default: `edit`

*tbd.*