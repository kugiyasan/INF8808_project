import React from 'react';
import './spotify-player.css'; // Import CSS for styling

// Define the type for the props
interface SpotifyPlayerProps {
  track: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ track }) => {
  return (
    <div className="profile-card">
      <iframe
            key={track} // Add key to force re-render
            id='embedded-player'
            src={`https://open.spotify.com/embed/track/${track}?utm_source=generator&theme=0`}
            width="300"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
