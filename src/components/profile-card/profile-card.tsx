import React from 'react';
import './profile-card.css'; // Import CSS for styling

// Define the type for the props
interface ProfileCardProps {
  name: string;
  githubName: string;
  setTrackId: (trackId: string) => void;
  trackId: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, githubName, setTrackId, trackId }) => {
  const handleClick = () => {
    setTrackId(trackId);
    console.log('Clicked on', name);
  };

  return (
    <div className="profile-card">
      <div className="circle" onClick={handleClick}>
        <img src={`https://github.com/${githubName}.png`} alt="profile" />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default ProfileCard;
