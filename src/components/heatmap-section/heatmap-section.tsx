import React, { useState } from "react";
import Dropdown from "../Dropdown/dropdown";
import HeatmapD3 from "../../HeatMap/HeatMap";
import "./heatmap-section.css";

interface HeatmapSectionProps {
  dataset?: any[];
}

const HeatmapSection: React.FC<HeatmapSectionProps> = ({ dataset }) => {
  const [factors, setFactors] = useState<string[]>([]);

  // Only include the 13 factors present in the heatmap image
  const options = [
    { name: "popularity" },
    { name: "duration_ms" },
    { name: "danceability" },
    { name: "energy" },
    { name: "loudness" },
    { name: "mode" },
    { name: "speechiness" },
    { name: "acousticness" },
    { name: "instrumentalness" },
    { name: "liveness" },
    { name: "valence" },
    { name: "tempo" },
    { name: "time_signature" },
  ];

  const handleFactorSelection = (selectedFactors: string[]) => {
    if (selectedFactors.length <= 13) {
      setFactors(selectedFactors);
    }
  };

  return (
    <div className="heatmap-section">
      <h2>Heatmap</h2>
      <Dropdown
        onUpdate={handleFactorSelection}
        options={options}
        placeholder="Select up to 13 factors"
        limit={13}
        singleSelect={false}
      />
      <div className="heatmap-container">
        {dataset === undefined ? null : (
          <HeatmapD3 data={dataset} factors={factors} />
        )}
      </div>
    </div>
  );
};

export default HeatmapSection;
