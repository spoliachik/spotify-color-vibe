

import SpotifyWebApi from "spotify-web-api-node";


var client_id = '94606aa37e9448409ea9bb78cc18c3e2';
var response_type = 'code';
var redirect_uri = 'http://localhost:3000/';
var url = 'https://accounts.spotify.com'

export const loginURL = `${url}/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`

