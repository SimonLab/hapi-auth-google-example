# hapi-auth-google-example

An example on how you can use [hapi-auth-google](https://github.com/dwyl/hapi-auth-google) with you application!

[![Build Status](https://travis-ci.org/SimonLab/hapi-auth-google-example.svg?branch=master)](https://travis-ci.org/SimonLab/hapi-auth-google-example)
# How to run it?

## Clone this repository

```sh
git clone git@github.com:SimonLab/hapi-auth-google-example.git
```

## Install the dependencies

```sh
npm install
```
## Define and export your environment variable

```sh
GOOGLE_CLIENT_ID=YourAppsClientId.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SuperSecret
BASE_URL=http://localhost:8000 # same as Authorized JavaScript Origin in your google app
SECRET=yoursercret #the secret to use with JWT
```
## Create your handler function

### Create and use your Json Web token

This example is using [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2) to manage the authentication
