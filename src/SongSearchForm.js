import React, { useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from './useAuth';
import SongDataModule from './SongDataModule';
import './SongSearchForm.css';
import ColorTile from './ColorTile';
import axios from 'axios';
import qs from 'qs';

console.log(process.env);
const credentials = {
    clientId: "94606aa37e9448409ea9bb78cc18c3e2",
    clientSecret: "3abe07cb41144937976ee19837b26f13",
    redirectUri: 'http://localhost:3000/'
}
console.log(credentials);

const SongSearchForm = () => {

    //can i do authentication from here? do I need authentication?? 

    const getAuth = async () => {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
              'Authorization': 'Basic ' + (Buffer(credentials.clientId + ':' + credentials.clientSecret).toString('base64'))
            },
            form: {
              grant_type: 'client_credentials'
            },
            json: true
          };
          
        try {
            await axios.post(authOptions, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                var token = body.access_token;
                console.log(token);
                authCode = token;
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    const authCode = getAuth();

    let [songName, setSongName] = useState("");
    let [tracks, setTracks] = useState([]);
    let [songDataModules, setSongDataModules] = useState([]);
    let [searchStarted, setSearchStarted] = useState(false);
    let [songClicked, setSongClicked] = useState(false);
    let [songColorData, setSongColorData] = useState({});

    const onSearchChange = (async () =>  {
        setSearchStarted(true);
        if (songName.length == 0) {
            return;
        } else {
            try {


                // const api_url = `https://api.spotify.com/v1/audio-features/${track_id}`;
                // //console.log(api_url);
                // try{
                //   const response = await axios.get(api_url, {
                //     headers: {
                //       'Authorization': `Bearer ${access_token}`
                //     }
                //   });
                //   //console.log(response.data);
                //   return response.data;
                // }catch(error){
                //   console.log(error);
                // } 

                const params = {
                    q: songName,
                    type: "track",
                    limit: 10,
                };
                const headers = {
                    'Authorization': `Bearer ${authCode}`
                }
                const api_url = `https://api.spotify.com/v1/search/`;

                const results = await axios.get(api_url, {params: params}, {headers: headers});
                console.log(results);
                // let results = await spotifyApi.searchTracks(songName, {params});


                setTracks(results.body.tracks.items);
                let tempSongDataArray = [];
                for (let i = 0; i < tracks.length; i++) {
                    tempSongDataArray.push(
                        <SongDataModule 
                            key={i} 
                            data={tracks[i]}
                            //need to pass authCode probably
                            setSongClicked={setSongClicked}
                            setSongColorData={setSongColorData}
                            className="songModule"
                        />
                    );
                } 
                setSongDataModules(tempSongDataArray);
            } catch (err){
                console.log(err);
            }
        }

    });

    return (
        <div className="mainDiv">
            <div className="leftSide">
            <label className="searchLabel">
                Search For a Song: 
            </label>
            <div className="searching">
                <form className="searchLabel">
                    <input type="text" 
                        className="searchInput"
                        placeholder="Song Title"
                        name="songName"
                        value={songName}
                        onChange={e => {setSongName(e.target.value); onSearchChange();}} 
                    />
                </form>
            </div>
                <div className="songDataModules">
                    {searchStarted && songDataModules}
                </div>
            </div>
            <div className="rightSide">
                {songClicked && <ColorTile songData={songColorData}/>}
            </div>
        </div>
    );
}

export default SongSearchForm;