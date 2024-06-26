import BoxPlotExplicit from "../../visualizations/BoxPlotExplicit/BoxPlotExplicit";
import Dropdown from "../../Dropdown/dropdown";
import { Entry } from "../../../dataset";
import { GENRES } from "../../../genres";
import React from "react";

interface BoxPlotSectionProps {
  dataset: Entry[];
}

const BoxPlotSection: React.FC<BoxPlotSectionProps> = ({ dataset }) => {
  const preSelectedOptions = [
    { name: "rock" },
    { name: "pop" },
    { name: "hip-hop" },
    { name: "jazz" },
    { name: "classical" },
  ];
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>(
    preSelectedOptions.map((genre) => genre.name.toLowerCase())
  );

  const handleUpdateGenres = (selected: string[]) => {
    setSelectedGenres(selected.map((genre) => genre.toLowerCase()));
  };

  return (
    <>
      <h2>What is the impact of explicit lyrics on track popularity?</h2>
      <Dropdown
        onUpdate={handleUpdateGenres}
        options={GENRES}
        placeholder={"Select up to 5 genres"}
        limit={5}
        preSelected={preSelectedOptions}
      />
      <div className="visual-container">
        <BoxPlotExplicit data={dataset} genres={selectedGenres} />
      </div>
    </>
  );
};

export default BoxPlotSection;
