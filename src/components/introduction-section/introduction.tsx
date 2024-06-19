import React from 'react';
import './introduction.css'; // Import CSS for styling


const Introduction: React.FC = () => {
  return (
    <div id='introduction'>
        <div id="container">
            <img id='spotify-logo' src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" alt="Spotify logo" />
            <h1>Spotify Tracks Analysis</h1>
        </div>
    </div>
  );
};

export default Introduction;
