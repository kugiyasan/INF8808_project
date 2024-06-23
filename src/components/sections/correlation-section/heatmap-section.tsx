import { FC, useState } from "react";
import CorrelationHeatmap from "./Heatmap";
import { Entry } from "../../../dataset";
import Dropdown from "../../Dropdown/dropdown";
import { GENRES } from "../../../genres";

interface CorrelationSectionProps {
  dataset: Entry[];
}

const CorrelationSection: FC<CorrelationSectionProps> = ({ dataset }) => {
  const [genres, setGenres] = useState<string[]>([
    'K-Pop', 'Pop', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'R&B', 'Country', 'Folk', 'Reggae', 'Blues', 'Metal', 'Punk', 'Disco', 'Soul', 'Funk', 'Techno', 'House', 'Dance', 'Trance', 'Dubstep', 'Drum and Bass'
  ]);

  return (
    <>
      <h2>How do a parameter influence the popularity of a genre ?</h2>
      <Dropdown
        onUpdate={setGenres}
        options={GENRES}
        placeholder="Select up to 10 genres"
        preSelected={[]}
        limit={10}
      />
      <div className="correlation-container">
        <CorrelationHeatmap dataset={dataset} genresSelected={genres} />
      </div>
    </>
  );
};

export default CorrelationSection;
