import React, { useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from './useAuth';
import SongDataModule from './SongDataModule';
import './SongSearchForm.css';
import ColorTile from './ColorTile';

const credentials = {
    clientId: '94606aa37e9448409ea9bb78cc18c3e2',
    clientSecret: '3abe07cb41144937976ee19837b26f13',
    redirectUri: 'https://master.dy3nys5bnlcvv.amplifyapp.com/'
}

const SongSearchForm = (code) => {
    const authCode = useAuth(code);
    const spotifyApi = new SpotifyWebApi(credentials);
    spotifyApi.setAccessToken(authCode);

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
                let results = await spotifyApi.searchTracks(songName, {limit: 10});
                setTracks(results.body.tracks.items);
                let tempSongDataArray = [];
                console.log(spotifyApi);
                for (let i = 0; i < tracks.length; i++) {
                    tempSongDataArray.push(
                        <SongDataModule 
                            key={i} 
                            data={tracks[i]} 
                            api={spotifyApi}
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