

import SpotifyWebApi from "spotify-web-api-node";


var client_id = '94606aa37e9448409ea9bb78cc18c3e2';
var response_type = 'code';
var redirect_uri = 'http://localhost:3000/';
var url = 'https://accounts.spotify.com'

export const loginURL = `${url}/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`


// export default function makeSpotifyApi (code) {

//     const spotifyApi = new SpotifyWebApi({
//         clientId: "94606aa37e9448409ea9bb78cc18c3e2",
//         clientSecret: "3abe07cb41144937976ee19837b26f13",
//         redirectUri: "http://localhost:3000/"
//     });
    
//     spotifyApi.authorizationCodeGrant(code).then(
//         function(data) {
//             console.log('The token expires in ' + data.body['expires_in']);
//             console.log('The access token is ' + data.body['access_token']);
//             console.log('The refresh token is ' + data.body['refresh_token']);
    
//             spotifyApi.setAccessToken(data.body[`access_token`]);
//             spotifyApi.setRefreshToken(data.body[`refresh_token`]);
//         }
//     );

//     return spotifyApi;
// }

// loginUrl = "https://accounts.spotify.com/authorize?client_id=YourClientId&response_type=code&redirect_uri=https://localhost:3000/&scope=streaming%20user-read-email

// export default function authorize() {
//     console.log('authorizing')
//     axios.get(`${url}/authorize`, { params })
//     .then(res => {
//         console.log(res);
//         return res;
//     });
// }

// export default authorize;