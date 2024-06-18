import React, { useState } from "react";
import SpotifyPlayer from 'react-spotify-player';
import "./App.css";

function App() {
  const size = {
    width: 500,
    height: 200,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'
   
  
  return (
    <div className="App">
      <div className="section" id="section1">
        <h1 id='main-title'>SPOTEAM</h1>
        <div className="card">
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <SpotifyPlayer
            uri="spotify:track:5SuOikwiRyPMVoIQDJUgSV"
            size={size}
            view={view}
            theme={'black'}
              />
          <iframe id='embedded-player' src="https://open.spotify.com/embed/track/5dkSQ8ExtSaS5diqiQosOk?utm_source=generator&theme=0" width="60%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
      <div className="section" id="section2">
        <h1>Section 2</h1>
        <p>This is the second section.</p>
      </div>
      <div className="section" id="section3">
        <h1>Section 3</h1>
        <p>This is the third section.</p>
      </div>
    </div>
  );
}

export default App;
