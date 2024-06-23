import { FC, useState } from "react";
import Dropdown from "../../Dropdown/dropdown";
import BoxPlotD3 from "../../visualizations/BoxPlot/BoxPlot";
import { Entry } from "../../../dataset";
import { GENRES } from "../../../genres";

interface BoxPlotSectionProps {
  dataset: Entry[];
}

const BoxPlotSection: FC<BoxPlotSectionProps> = ({ dataset }) => {
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
      <h2>Which genre is the most suitable to dance on 💃🕺</h2>
      <Dropdown
        onUpdate={setGenres}
        options={GENRES}
        placeholder="Select up to 10 genres"
        preSelected={preSelected}
        limit={10}
      />
      <div className="boxplot-container">
        <BoxPlotD3 data={dataset} genres={genres} />
      </div>
    </>
  );
};

export default BoxPlotSection;
