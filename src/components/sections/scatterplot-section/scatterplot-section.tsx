import React, { useState } from "react";
import Dropdown from "../../Dropdown/dropdown";
import ScatterPlot from "../../visualizations/ScatterPlot/ScatterPlot";
import "./scatterplot-section.css";
import { Entry } from "../../../dataset";

interface ScatterPlotSectionProps {
  dataset: Entry[];
}

const ScatterPlotSection: React.FC<ScatterPlotSectionProps> = ({ dataset }) => {
  const [xAxis, setXAxis] = useState<string>("tempo");
  const [yAxis, setYAxis] = useState<string>("danceability");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["alt-rock"]);

  const axisOptions = [
    { name: "popularity" },
    { name: "speechiness" },
    { name: "danceability" },
    { name: "tempo" },
    { name: "energy" },
    { name: "loudness" },
    // Add more options as needed
  ];

  const genreOptions = dataset
    ? Array.from(new Set(dataset.map((d) => d.track_genre))).map((genre) => ({
        name: genre,
      }))
    : [];

  const handleXAxisSelection = (axis: string) => {
    setXAxis(axis);
  };

  const handleYAxisSelection = (axis: string) => {
    setYAxis(axis);
  };

  const handleGenreSelection = (selected: string[]) => {
    setSelectedGenres(selected);
  };

  return (
    <>
      <h2>Scatter Plot</h2>
      <div className="dropdown-container">
        <div className="axis-select">
          <label>X-axis:</label>
          <div>
            {axisOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleXAxisSelection(option.name)}
                className={xAxis === option.name ? "selected" : ""}
              >
                {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="axis-select">
          <label>Y-axis:</label>
          <div>
            {axisOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleYAxisSelection(option.name)}
                className={yAxis === option.name ? "selected" : ""}
              >
                {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <Dropdown
          onUpdate={handleGenreSelection}
          options={genreOptions}
          placeholder="Select up to 5 genres"
          preSelected={selectedGenres.map((genre) => ({ name: genre }))}
          limit={5}
        />
      </div>
      <div className="scatterplot-container">
        <ScatterPlot
          data={dataset}
          xAxis={xAxis}
          yAxis={yAxis}
          selectedGenres={selectedGenres}
        />
      </div>
    </>
  );
};

export default ScatterPlotSection;
