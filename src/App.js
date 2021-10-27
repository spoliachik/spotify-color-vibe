import './App.css';
import Login from "./Login";
import SongSearch from "./SongSearch";
import useAuth from "./useAuth";
// import makeSpotifyApi from './spotify';


// TO START SERVER RUN node server.js in separate terminal, then npm run start to start react app

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  console.log(code);
  return (
    <div className="app">
      <SongSearch />
    </div>
  );
}

export default App;
