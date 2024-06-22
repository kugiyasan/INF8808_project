import React from "react";
import "./footer.css"; // Import CSS for styling
import ProfileCard from "../../profile-card/profile-card";

interface FooterProps {
  trackId: string;
  setTrackId: (trackId: string) => void;
}

interface TeamMember {
  name: string;
  githubName: string;
  trackId: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Maxime Pierre",
    githubName: "maximepierregit",
    trackId: "7jfZybgHr6yzp4iuMS2K8u?si=456f98dfd94349eb",
  },
  {
    name: "Leo Banno-Cloutier",
    githubName: "kugiyasan",
    trackId: "5w6EvyvomUSWsF430iixmc?si=afa4184775034a3c",
  },
  {
    name: "Boniface Bahati Tadjuidje",
    githubName: "gossterrible",
    trackId: "4xlpJ99yL9xYQtzG6c3hwk?si=dbbc41c1eca848bf",
  },
  {
    name: "Yuliia Yuriyivn Ozirska",
    githubName: "YuliiaOz",
    trackId: "3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb",
  },
  {
    name: "Hamid Zand Miralvand",
    githubName: "hamidzandm",
    trackId: "3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb",
  },
  {
    name: "François Tourigny",
    githubName: "tourtourigny",
    trackId: "3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb",
  },
  {
    name: "Ahmed Zghal",
    githubName: "AhmedZghal",
    trackId: "3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb",
  },
];

const Footer: React.FC<FooterProps> = ({ setTrackId }) => {
  return (
    <div className="footer">
      <div className="visual-container">
        <h1>Meet the team</h1>
        <div className="row">
          {teamMembers.slice(0, 4).map((member, index) => (
            <ProfileCard
              key={index}
              name={member.name}
              githubName={member.githubName}
              setTrackId={setTrackId}
              trackId={member.trackId}
            />
          ))}
        </div>
        <div className="row">
          {teamMembers.slice(4).map((member, index) => (
            <ProfileCard
              key={index + 4}
              name={member.name}
              githubName={member.githubName}
              setTrackId={setTrackId}
              trackId={member.trackId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
