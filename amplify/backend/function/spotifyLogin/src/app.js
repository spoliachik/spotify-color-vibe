

// /*
// Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
//     http://aws.amazon.com/apache2.0/
// or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and limitations under the License.
// */




// var express = require('express')
// var bodyParser = require('body-parser')
// var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// // declare a new express app
// var app = express()
// app.use(bodyParser.json())
// app.use(awsServerlessExpressMiddleware.eventContext())

// // Enable CORS for all methods
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "*")
//   next()
// });


// /**********************
//  * Example get method *
//  **********************/

// app.get('/login', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// app.get('/login/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// /****************************
// * Example post method *
// ****************************/

// app.post('/login', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// app.post('/login/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example put method *
// ****************************/

// app.put('/login', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// app.put('/login/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example delete method *
// ****************************/

// app.delete('/login', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.delete('/login/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.listen(3000, function() {
//     console.log("App started")
// });

// var http = require('http');

require('dotenv').config();

var express = require('express');
const cors = require('cors');
const spotifyWebApi = require('spotify-web-api-node');

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use(cors()) // to handle cross-origin requests
app.use(express.json()); // to parse JSON bodies

var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

const credentials = {
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: 'https://master.d139yngib8df9c.amplifyapp.com/'
}

app.get('/', (req, res) => {
    console.log("Hello World!")
});

app.post('/login', (req, res) => {
    console.log('in login...');
    console.log(`the code is: ${req.body.code}`);
    //setup
    let spotifyApi = new spotifyWebApi(credentials)

    //get the "code" value passed from the client side and get the user's accessToken from the spotify api
    const code = req.body.code
    // console.log(code);
    // console.log(req.body)
    
    //retrieve an access token
    spotifyApi.authorizationCodeGrant(code).then((data) => {
        // console.log(`The new access token is... ${data.body.access_token}`)
        //returning the user's AccessToken in the json format
        res.json({
            accessToken: data.body.access_token,
        })
    })
    .catch((err) => {
        console.log(`Happening in .authorizationCodeGrant: ${err}`);
        res.sendStatus(400);
    })
});

app.listen(3000, () => {
    console.log(`App listening!`)
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

