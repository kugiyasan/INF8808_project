import React from 'react';
import './footer.css'; // Import CSS for styling
import ProfileCard from '../profile-card/profile-card';
import SpotifyPlayer from '../spotify-player/spotify-player';

interface FooterProps {
    trackId: string;
    setTrackId: (trackId: string) => void;
  }

const Footer: React.FC<FooterProps> = ({setTrackId, trackId}) => {
  return (
    <div className="footer">
        <h1>Meet the team</h1>
      <div className="row">
      <ProfileCard
            name='Maxime Pierre'
            githubName='maximepierregit'
            setTrackId={setTrackId}
            trackId='7jfZybgHr6yzp4iuMS2K8u?si=456f98dfd94349eb'
        />
        <ProfileCard
            name='Leo Banno-Cloutier'
            githubName='kugiyasan'
            setTrackId={setTrackId}
            trackId='5w6EvyvomUSWsF430iixmc?si=afa4184775034a3c'
        />
        <ProfileCard
            name='Boniface Bahati Tadjuidje'
            githubName='gossterrible'
            setTrackId={setTrackId}
            trackId='4xlpJ99yL9xYQtzG6c3hwk?si=dbbc41c1eca848bf'
        />
        <ProfileCard
            name='Yuliia Yuriyivn Ozirska'
            githubName='YuliiaOz'
            setTrackId={setTrackId}
            trackId='3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb'
        />
      </div>
      <div className="row">
      <ProfileCard
            name='Hamid Zand Miralvand'
            githubName='hamidzandm'
            setTrackId={setTrackId}
            trackId='3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb'
        />
        <ProfileCard
            name='François Tourigny'
            githubName='tourtourigny'
            setTrackId={setTrackId}
            trackId='3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb'
        />
        <ProfileCard
            name='Ahmed Zghal'
            githubName='AhmedZghal'
            setTrackId={setTrackId}
            trackId='3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb'
        />
      </div>
      <SpotifyPlayer track={trackId}/>
    </div>
  );
};

export default Footer;
