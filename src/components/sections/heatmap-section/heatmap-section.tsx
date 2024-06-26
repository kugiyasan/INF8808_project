import React, { useState } from "react";
import Dropdown, { DropdownItem } from "../../Dropdown/dropdown";
import HeatmapD3 from "../../visualizations/HeatMap/HeatMap";
import { Entry } from "../../../dataset";
import { FACTORS } from "./factors";

interface HeatmapSectionProps {
  dataset: Entry[];
}

const metricDefinitions: { [key: string]: string } = {
  popularity: "A measure of how popular a song is, ranging from 0 to 100.",
  duration_ms: "The duration of the song in milliseconds.",
  danceability: "How suitable a track is for dancing, ranging from 0.0 to 1.0.",
  energy: "A measure of intensity and activity, ranging from 0.0 to 1.0.",
  loudness: "The overall loudness of a track in decibels (dB).",
  mode: "The modality of the track (major is 1, minor is 0).",
  speechiness: "Presence of spoken words in a track, ranging from 0.0 to 1.0.",
  acousticness: "How acoustic the track is, ranging from 0.0 to 1.0.",
  instrumentalness:
    "The likelihood that the track is instrumental, ranging from 0.0 to 1.0.",
  liveness:
    "The presence of a live audience in the recording, ranging from 0.0 to 1.0.",
  valence: "Musical positiveness conveyed by a track, ranging from 0.0 to 1.0.",
  tempo: "The speed or pace of a given track in beats per minute (BPM).",
  time_signature:
    "The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure) ranging from 3 to 7",
};

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
    preSelected.map((e) => e.name)
  );
  const [hoveredMetric, setHoveredMetric] = useState<string>("");

  return (
    <>
      <h2>
        Louder = more energy! (and other fun facts about songs&apos;
        characteristics)
      </h2>
      <Dropdown
        onUpdate={setFactors}
        options={FACTORS}
        preSelected={preSelected}
        placeholder="Select up to 13 factors"
        limit={13}
      />
      <div style={{ marginTop: "20px", minHeight: "40px", color: "white" }}>
        {metricDefinitions[hoveredMetric] ||
          "Hover over a metric to see its definition"}
      </div>
      <HeatmapD3 factors={factors} onHover={setHoveredMetric} />
    </>
  );
};

export default HeatmapSection;
