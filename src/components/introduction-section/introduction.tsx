import React from 'react';
import './introduction.css'; // Import CSS for styling


const Introduction: React.FC = () => {
  return (
    <div id='introduction'>
        <div id="container">
          <div id='left-column'>
            <img id='spotify-logo' src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" alt="Spotify logo" />
          </div>
          <div id='right-column'>
            <h1>Spotify Tracks Analysis</h1>
            <p>Welcome to our Spotify Tracks Analysis Website! Using the power of D3.js, we transform complex music data into interactive visualizations.
              Explore key metrics like popularity, tempo, and energy levels through dynamic charts.
              Discover what makes a track popular and uncover hidden patterns in your favorite music. Start exploring now and let the music data speak! </p>
          </div>
        </div>
    </div>
  );
};

export default Introduction;
