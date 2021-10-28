import SpotifyWebApi from "spotify-web-api-node";
import { clientId, clientSecret } from './secrets';
import axios from 'axios';
import querystring from 'querystring';


console.log(process.env.CLIENT_SECRET);

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var response_type = 'code';
var redirect_uri = 'http://localhost:3000/';
var url = 'https://accounts.spotify.com'

export const loginURL = `${url}/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`

const getToken = () => {
    return axios({
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        },
        data: querystring.stringify({'grant_type' : 'client_credentials'}),
        url: 'https://accounts.spotify.com/api/token'
    })
}

export default getToken;