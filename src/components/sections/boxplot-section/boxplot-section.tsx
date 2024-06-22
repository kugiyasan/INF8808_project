import React, { useEffect, useState } from "react";
import Dropdown from "../../Dropdown/dropdown";
import BoxPlotD3 from "../../visualizations/BoxPlot/BoxPlot";
import { Entry } from "../../../dataset";

interface BoxPlotSectionProps {
  dataset: Entry[];
}

const BoxPlotSection: React.FC<BoxPlotSectionProps> = ({ dataset }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [options, setOptions] = useState<{ name: string }[]>([]);

  useEffect(() => {
    if (dataset) {
      const uniqueGenres = Array.from(
        new Set(dataset.map((track) => track.track_genre)),
      );
      setOptions(uniqueGenres.map((genre) => ({ name: genre })));
    }
  }, [dataset]);

  const handleGenreSelection = (selectedGenres: string[]) => {
    if (selectedGenres.length <= 10) {
      setGenres(selectedGenres);
    }
  };

  return (
    <>
      <h2>Genres: {genres.join(", ")}</h2>
      <Dropdown
        onUpdate={handleGenreSelection}
        options={options}
        placeholder="Select up to 10 genres"
        limit={10}
      />
      <div className="boxplot-container">
        <BoxPlotD3 data={dataset} genres={genres} />
      </div>
    </>
  );
};

export default BoxPlotSection;
