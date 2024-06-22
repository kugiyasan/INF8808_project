import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/dropdown";
import BoxPlotD3 from "../../BoxPlot/BoxPlot";
import "./boxplot-section.css";

interface BoxPlotSectionProps {
  dataset?: any[];
}

const BoxPlotSection: React.FC<BoxPlotSectionProps> = ({ dataset }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [options, setOptions] = useState<{ name: string }[]>([]);

  useEffect(() => {
    if (dataset) {
      const uniqueGenres = Array.from(
        new Set(dataset.map((track) => track.track_genre))
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
    <div className="boxplot-section">
      <h2>Genres: {genres.join(", ")}</h2>
      <div className="dropdown-container">
        <Dropdown
          onUpdate={handleGenreSelection}
          options={options}
          placeholder="Select up to 10 genres"
          limit={10}
          singleSelect={false}
        />
      </div>
      <div className="boxplot-container">
        {dataset === undefined ? null : (
          <BoxPlotD3 data={dataset} genres={genres} />
        )}
      </div>
    </div>
  );
};

export default BoxPlotSection;
