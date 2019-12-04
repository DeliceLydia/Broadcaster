[![Build Status](https://travis-ci.org/DeliceLydia/Broadcaster.svg?branch=develop)](https://travis-ci.org/DeliceLydia/Broadcaster)

[![Coverage Status](https://coveralls.io/repos/github/DeliceLydia/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/DeliceLydia/Broadcaster?branch=develop)

[![Maintainability](https://api.codeclimate.com/v1/badges/0b8cead42355c4071831/maintainability)](https://codeclimate.com/github/DeliceLydia/Broadcaster/maintainability)

# Broadcaster
Corruption is a huge bane to Africa’s development. African countries must develop novel and localized solutions that will curb this menace, hence the birth of Broadcaster. Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention

## User Interface (UI)
* HTML
* CSS

### GitHub Pages link for UI
[Broadcaster/UI link](https://delicelydia.github.io/Broadcaster/UI/html/index.html)

---------------------------------------------------------------------

## Link to Broadcaster on Heroku

[Broadcaster](https://broadcaster1.herokuapp.com) 

## SERVER

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /api/v2/auth/signup| POST | Get the user to signup |
| /api/v2/auth/signin | POST | Get the user to signin|
| /api/v2/red-flags | POST | Get the user to post a redFlag record |
| /api/v2/red-flags/:id | GET | Get the user to get all redflags records |
 /api/v2/red-flags/:id | GET |Get user to view a specific redflag by Id  |
| /api/v2/red-flags/:id | DELETE| Get the user to DELETE his redflags records |
| /api/v2/red-flags/:id/location| PATCH | Get the user to change the location of the redflag|
| /api/v2/red-flags/:id/comment| PATCH | Get the user to change the comment of the redflag|
| /api/v2/red-flags/:id/status| PATCH | Get the admin to change the status of the redflag|

For more details about endpoints [check the documentation here](https://github.com/DeliceLydia/Broadcaster

## BUILT WITH

 * Javascript
 * NodeJs
 * ExpressJs

## TESTING TOOLS

 * Mocha
 * Chai
 * nyc

 ## Continuous Integration

* Travis CI
* Coveralls

## Deployment

Heroku

 ## HOW TO RUN THE APPLICATION

 ### SETING UP THE ENVIRONMENT
 
 1. Clone this repository to your local PC

    **` git clone https://github.com/DeliceLydia/Broadcaster.git`** [here](https://github.com/DeliceLydia/Broadcaster)

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
> npm start
```
## Run the test
```
> npm test
```


## Author
- Lydia Ingabire <Delydia84@gmail.com>

