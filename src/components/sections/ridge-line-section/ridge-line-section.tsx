import Dropdown from "../../Dropdown/dropdown";
import React from "react";
import RidgelinePlot from "../../visualizations/RidgeLine/RidgeLine";
import { GENRES } from "../../../genres";

interface RidgeLineSectionProps {
  dataset?: any[];
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
    preSelectedOptions.map((genre) => genre.name.toLowerCase()),
  );
  // const [kernelBandwidth, setKernelBandwidth] = React.useState<number>(7);
  // const [numTicks, setNumTicks] = React.useState<number>(40);
  const kernelBandwidth = 7;
  const numTicks = 40;

  const handleUpdateGenres = (selected: string[]) => {
    setSelectedGenres(selected.map((genre) => genre.toLowerCase()));
  };

  return (
    <div className="visual-section">
      <h2>Selected Genres: {selectedGenres.join(", ")}</h2>
      <Dropdown
        onUpdate={handleUpdateGenres}
        options={GENRES}
        placeholder={"Select up to 5 genres"}
        limit={5}
        singleSelect={false}
        preSelected={preSelectedOptions}
      />

      {/* <div>
                <label>
                    Kernel Bandwidth:
                    <input
                        type="number"
                        value={kernelBandwidth}
                        onChange={(e) => setKernelBandwidth(Number(e.target.value))}
                        min="1"
                        max="20"
                    />
                </label>
                <label>
                    Number of Ticks:
                    <input
                        type="number"
                        value={numTicks}
                        onChange={(e) => setNumTicks(Number(e.target.value))}
                        min="10"
                        max="100"
                    />
                </label>
            </div> */}

      <div className="visual-container">
        {dataset === undefined ? null : (
          <RidgelinePlot
            data={dataset}
            selectedGenres={selectedGenres}
            kernelBandwidth={kernelBandwidth}
            numTicks={numTicks}
          />
        )}
      </div>
    </div>
  );
};

export default RidgeLineSection;
