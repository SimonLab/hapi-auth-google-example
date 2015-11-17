# hapi-auth-google-example

An example on how you can use [hapi-auth-google](https://github.com/dwyl/hapi-auth-google) with you application!

[![Build Status](https://travis-ci.org/SimonLab/hapi-auth-google-example.svg?branch=master)](https://travis-ci.org/SimonLab/hapi-auth-google-example)
# How to run it?

Clone the repository:

```sh
git clone git@github.com:SimonLab/hapi-auth-google-example.git
```

Install the dependencies:

```sh
npm install
```

## Create your google application

If you don't know how to define an application with google you will find all the documentation on the [dwyl' step by step guide](https://github.com/dwyl/hapi-auth-google/blob/master/GOOGLE-APP-STEP-BY-STEP-GUIDE.md)

## Define and export your environment variable

```sh
GOOGLE_CLIENT_ID=YourAppsClientId.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SuperSecret
BASE_URL=http://localhost:8000 # same as Authorized JavaScript Origin in your google app
SECRET=yoursercret #the secret to use with JWT
```
## Create your custom handler function

If the authorization is successful your Google app will return a token to your REDIRECT_URL. Then you need to define what to do and which schema to implement to allow authentication to your users.

For this example we will use [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2) to manage the authentication

### Create and use your Json Web token
