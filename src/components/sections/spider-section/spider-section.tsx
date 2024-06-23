import { useState } from "react";
import SpiderChart from "../../visualizations/SpiderChart/SpiderChart";
import Dropdown from "../../Dropdown/dropdown";
import { GENRES } from "../../../genres";
import { Entry } from "../../../dataset";

interface SpiderSectionProps {
  dataset: Entry[];
}

const SpiderSection: React.FC<SpiderSectionProps> = ({ dataset }) => {
  const preSelected = [
    { name: "rock" },
    { name: "pop" },
    { name: "hip-hop" },
    { name: "jazz" },
    { name: "classical" },
  ];
  const [genres, setGenres] = useState<string[]>(
    preSelected.map((genre) => genre.name),
  );

  return (
    <>
      <h2>Comparison of various songs' stats by genre</h2>
      <Dropdown
        onUpdate={setGenres}
        options={GENRES}
        placeholder={"Select up to 5 genres"}
        preSelected={preSelected}
        limit={5}
      />
      <SpiderChart dataset={dataset} selectedGenres={genres}/>
    </>
  );
};

export default SpiderSection;
