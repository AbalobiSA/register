# marketplace-register

This webpage allows new users to sign up for Abalobi Marketplace. By default, after registering, their approval status is set to `false`
and they will not be able to log into the Marketplace app yet. An Abalobi administrator can approve new users from the Abalobi admin panel,
after which the new users will be approved and able to log in.

This repository is developed in Ionic but deployed as a website hosted on Heroku. This required some extra setup, since Ionic apps are really
meant to be deployed as mobile apps, not as websites (this also means that there are extra things to keep in mind when working on this repo,
so please read this whole document as background before starting). New updates can now be deployed by simply pushing to the `deploy` branch, 
Heroku tracks this branch and once it sees any changes it will update the deployed website automatically.

## Deploying an Ionic app to Heroku

### 1. Setting up a Node server
Normally Ionic apps can be deployed in a browser by running `$ ionic serve`. This builds the Ionic app to the `/www` directory and then 
automatically opens a localhost port through which the build is served. This is similar to the function performed by `ng serve` in Angular 
sites.

Heroku, however, does not know how it should build and serve the Ionic app. Therefore, we need to manually set up a small Node.js server 
pointing to the `/www` folder to serve our website. This is done by simply creating a file called `server.js` in the root of the repository.
You will see that this file contains a few lines of code to start a Node server on port 5000. Also ensure that the following line is a child
of the  `scripts` key in `package.json`:  `"start": "node server.js"`. You can test that this works by running `npm start` in the command 
line. If everything is fine you will now be able to see the website at `localhost:5000`. If you make changes to your code you first have to
run `ionic serve` or `ionic build` to rebuild the `\www` folder, after which the changes will reflect at `localhost:5000`.

### 2. Removing `/www` from `.gitignore`

Since the `/www` folder is built every time `ionic serve` runs it is included in the `.gitignore` file by default. However, since Heroku is not 
going to run `ionic serve` and will instead deploy the contents of the `/www` directory directly on our little Node server, we need to ensure
that we push the contents of the `/www` folder to our repository. Do this by simply removing `/www` from the `.gitignore` file.

### 2. Things to keep in mind

Removing the `/www` folder from `.gitignore` has a few adverse effects. When serving the app through `ionic serve` or `npm start` the `/www`
folder is locked. But since git is now also tracking any changes to the `/www` folder some strange and interesting things can happen when we
try to switch branches while the app is being served. Usually files in `/www` folder is deleted. **This can be avoided by simply ensuring that
you are not running the app in the command line before switching branches in git**


## Possible Improvements
- Detailed improvement suggestions are provided in the source code marked TODO
- Retrieve communities from API instead of hardcoding.
- Spinner on loading controller for fisher registration is currently not spinning.
- Persist user input so they can choose to come back and continue later.
- In addition to filtering communities based on province, go ahead and sort the communities in alphabetical order.
