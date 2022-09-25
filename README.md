# icecastify
An express framework application that displays your spotify podcast iceberg 

Your spotify iceberg is your favorite podcasts ranked from most popular (at the top of the iceberg) to most undergroud (at the bottom of the iceberg)
This application will take your spotify podcasts directly from you logging into spotify!



# Spotify Accounts Authentication

icecastify constains the Spotify OAuth 2.0 flows for [authenticating against the Spotify Web API](https://developer.spotify.com/web-api/authorization-guide/).

* Authorization Code flow
* Client Credentials flow
* Implicit Grant flow

## Installation

icecastify is run on Node.js. On [its website](http://www.nodejs.org/download/) you can find instructions on how to install it. You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm.

Once installed, clone the repository and install its dependencies running:

    $ npm install
    
## Running the application
To run icecastify:

    $ node server.js

Then, open `http://localhost:3000` in a browser.


## Dependencies

Dependencies-
@types/gapi.auth2@0.0.56
@types/gapi@0.0.42
express@4.18.1
gapi@0.0.3
node-fetch@3.2.10
nodemon@2.0.20
pug@3.0.2
selenium-webdriver@4.4.0


## TODO:
Express Framework to display your personized iceberg of podcast ✅
Set up Express Framework ✅ 
Connect to spotify’s authentication api ✅
GET request user’s podcast information from the spotify Podcast api from fetch ✅
If authenticated, send user to iceberg page ✅
Create Javascript Selenium program to get searches of each podcast name ✅
Rank podcast from least to greatest ✅

