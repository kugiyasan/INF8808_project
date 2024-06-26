import Dropdown from "../../Dropdown/dropdown";
import { Entry } from "../../../dataset";
import { GENRES } from "../../../genres";
import React from "react";
import RidgelinePlot from "../../visualizations/RidgeLine/RidgeLine";

interface RidgeLineSectionProps {
  dataset: Entry[];
}

const RidgeLineSection: React.FC<RidgeLineSectionProps> = ({ dataset }) => {
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

  const kernelBandwidth = 7;
  const numTicks = 40;

  const handleUpdateGenres = (selected: string[]) => {
    setSelectedGenres(selected.map((genre) => genre.toLowerCase()));
  };

  return (
    <>
      <h2>Popularity distribution per genre</h2>
      <Dropdown
        onUpdate={handleUpdateGenres}
        options={GENRES}
        placeholder={"Select up to 5 genres"}
        limit={5}
        preSelected={preSelectedOptions}
      />

      <div className="visual-container">
        <RidgelinePlot
          data={dataset}
          selectedGenres={selectedGenres}
          kernelBandwidth={kernelBandwidth}
          numTicks={numTicks}
        />
      </div>
    </>
  );
};

export default RidgeLineSection;
