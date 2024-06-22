import React from "react";
import SpiderChart from "../../visualizations/SpiderChart/SpiderChart";
import Dropdown from "../../Dropdown/dropdown";
import { GENRES } from "../../../genres";

interface SpiderSectionProps {
  dataset?: any[];
}

const SpiderSection: React.FC<SpiderSectionProps> = ({ dataset }) => {
  const [genre, setGenre] = React.useState("");
  return (
    <div className="spider-section">
      <h2>{genre}</h2>
      <Dropdown
        onUpdate={setGenre}
        options={GENRES}
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
