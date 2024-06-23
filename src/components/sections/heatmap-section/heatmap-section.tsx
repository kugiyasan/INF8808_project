import React, { useState } from "react";
import Dropdown, { DropdownItem } from "../../Dropdown/dropdown";
import HeatmapD3 from "../../visualizations/HeatMap/HeatMap";
import { Entry } from "../../../dataset";
import { FACTORS } from "./factors";

interface HeatmapSectionProps {
  dataset: Entry[];
}

const HeatmapSection: React.FC<HeatmapSectionProps> = () => {
  const preSelected: DropdownItem[] = [
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
  const [factors, setFactors] = useState<string[]>(
    preSelected.map((e) => e.name),
  );

  return (
    <>
      <h2>Louder = more energy! (and other fun facts about songs&apos; characteristics)</h2>
      <Dropdown
        onUpdate={setFactors}
        options={FACTORS}
        preSelected={preSelected}
        placeholder="Select up to 13 factors"
        limit={13}
      />
      <HeatmapD3 factors={factors} />
    </>
  );
};

export default HeatmapSection;
