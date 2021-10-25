// var http = require('http');

var express = require('express');
const cors = require('cors');
const spotifyWebApi = require('spotify-web-api-node');

var app = express();
const port = 8000

app.use(cors()) // to handle cross-origin requests
app.use(express.json()); // to parse JSON bodies

const credentials = {
    clientId: '94606aa37e9448409ea9bb78cc18c3e2',
    clientSecret: '3abe07cb41144937976ee19837b26f13',
    redirectUri: 'http://localhost:3000/'
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
        console.log(`The new access token is... ${data.body.access_token}`)
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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})



