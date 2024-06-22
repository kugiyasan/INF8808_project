import React from "react";
import "./spider-section.css"; // Import CSS for styling
import SpiderChart from "../../visualizations/SpiderChart/SpiderChart";
import Dropdown from "../../Dropdown/dropdown";

interface SpiderSectionProps {
  dataset?: any[];
}

const SpiderSection: React.FC<SpiderSectionProps> = ({ dataset }) => {
  const [genre, setGenre] = React.useState("");
  const options = [
    { name: "Rock" },
    { name: "Pop" },
    { name: "Hip-Hop" },
    { name: "Jazz" },
    { name: "Classical" },
    { name: "Electronic" },
    { name: "R&B" },
    { name: "Country" },
    { name: "Folk" },
    { name: "Reggae" },
    { name: "Blues" },
    { name: "Metal" },
    { name: "Punk" },
    { name: "Disco" },
    { name: "Soul" },
    { name: "Funk" },
    { name: "Techno" },
    { name: "House" },
    { name: "Dance" },
    { name: "Trance" },
    { name: "Dubstep" },
    { name: "Drum and Bass" },
  ];
  return (
    <div className="spider-section">
      <h2>{genre}</h2>
      <Dropdown
        onUpdate={setGenre}
        options={options}
        placeholder={"Select up to 5 genres"}
        limit={5}
        singleSelect={false}
      />
      <div className="visual-container">
        {dataset === undefined ? null : <SpiderChart dataset={dataset} />}
      </div>
    </div>
  );
};

export default SpiderSection;
