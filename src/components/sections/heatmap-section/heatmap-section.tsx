import React, { useState } from "react";
import Dropdown, { DropdownItem } from "../../Dropdown/dropdown";
import HeatmapD3 from "../../visualizations/HeatMap/HeatMap";
import { Entry } from "../../../dataset";

interface HeatmapSectionProps {
  dataset: Entry[];
}

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

const HeatmapSection: React.FC<HeatmapSectionProps> = ({ dataset }) => {
  const preSelected: DropdownItem[] = [
    // { name: "popularity" },
    // { name: "duration_ms" },
    // { name: "danceability" },
    // { name: "energy" },
    // { name: "loudness" },
    // { name: "mode" },
    // { name: "speechiness" },
    // { name: "acousticness" },
    // { name: "instrumentalness" },
    // { name: "liveness" },
    // { name: "valence" },
    // { name: "tempo" },
    // { name: "time_signature" },
  ];
  const [factors, setFactors] = useState<string[]>(
    preSelected.map((e) => e.name),
  );

  return (
    <>
      <h2>Heatmap</h2>
      <Dropdown
        onUpdate={setFactors}
        options={options}
        preSelected={preSelected}
        placeholder="Select up to 13 factors"
        limit={13}
      />
      <HeatmapD3 data={dataset} factors={factors} />
    </>
  );
};

export default HeatmapSection;
