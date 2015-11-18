# Authorization and Authentication with [hapi-auth-google](https://github.com/dwyl/hapi-auth-google) and [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2)

[![codecov.io](https://codecov.io/github/SimonLab/hapi-auth-google-example/coverage.svg?branch=master)](https://codecov.io/github/SimonLab/hapi-auth-google-example?branch=master)
[![Build Status](https://travis-ci.org/SimonLab/hapi-auth-google-example.svg?branch=master)](https://travis-ci.org/SimonLab/hapi-auth-google-example)
![dependencies](https://david-dm.org/SimonLab/hapi-auth-google-example.svg)

With this example you are going to learn how to implement authorization using Goolgle+ API and how to authenticate your users with JSON Web Token.

# How to run it?

If you are already familiar with authorization, authentication and JWT and you already know [how to create a Google app](https://github.com/dwyl/hapi-auth-google/blob/master/GOOGLE-APP-STEP-BY-STEP-GUIDE.md) and [run a Redis server](https://github.com/dwyl/learn-redis), you can quickly run this example by following these steps:

- Clone the repository:

  ```sh
  git clone git@github.com:SimonLab/hapi-auth-google-example.git
  ```

- Install the dependencies:

  ```sh
  npm install
  ```

- Export the environment variables

  ```sh
  GOOGLE_CLIENT_ID=YourAppsClientId.apps.googleusercontent.com
  GOOGLE_CLIENT_SECRET=SuperSecret
  BASE_URL=http://localhost:8000 # same as Authorized JavaScript Origin in your google app
  SECRET=yoursercret #the secret to use with JWT
  ```

- Start Redis

  ```sh
  redis-server
  ```

- Run the tests

  ```sh
  npm test
  ```

- Run the application

  ```sh
  npm start
  ```

# step by step explanation

## Authorization

We are using Google API to handle the main steps of authorization for us. So first we need to create the app. There is already a good [step by step guide](https://github.com/dwyl/hapi-auth-google/blob/master/GOOGLE-APP-STEP-BY-STEP-GUIDE.md) which explains how to create the Google App. After completing the guide you will have access to the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables. This environment variables are used by the [hapi-auth-google](https://github.com/dwyl/hapi-auth-google) plugin to create an object on your server which simplify the requests with your Google App.

The following diagram explains in detail the steps of authorization:



So at the end of the authorization (and if everything is ok) your server will receive a token from Google App. This token is used to identify your users with your Google App.

## Authentication

We are using JWT to handle authentication. You need the following steps:

- create your JWT. We are encoding our JWT with a SECRET keyword of your choice (choose a difficult one to guess!)
- We are saving in Redis the profile with the new jwt.
- We are sending back our jwt to the browser (header authorization) and save it (cookie or local storage)
- When the browser asking for a protected page, the jwt is sent to the server
- We are checking the jwt and if it's correct we are retreiving our object from Redis to be able to use the Google token.

All these steps are implemented inside your custom handler function. This function defined what to do as soon as we receive the token from Google App.

### Define your custom handler function

The custom handler function has to main goals after the authorization is done (you receive a token from your Google app):

* Save our user into a database - This example is using Redis
* Generate a JSON Web Token to handle the authentication

If the authorization is successful, your Google app will return a token to your REDIRECT_URL. Then you need to define what to do and which schema to implement to allow authentication to your users.

For this example we will use [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2) to manage the authentication

## Logout from the app

JWT is a stateless process, this means that unlike standard authentication we don't use any session on the server to store the state of the user (login or not). Instead we use the HTTP request header to pass our JWT. To keep track of the status of our users we are using Redis and define if a user has the right to login or not. 

# Question

* Which method do I need to use to store the JWT token on the browser (local storage or cookie?)
* Is it safe to use a unique secret keyword to encrypt all of your JWT
* Why are we using Redis to strore our JWT?
* How to logout?
