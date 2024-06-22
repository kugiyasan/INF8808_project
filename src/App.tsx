import "./App.css";

import * as d3 from "d3";

import { Entry, preprocessDataset } from "./dataset";
import { useEffect, useState } from "react";

import Footer from "./components/sections/footer-section/footer.tsx";
import Introduction from "./components/sections/introduction-section/introduction.tsx";
import RidgeLineSection from "./components/sections/ridge-line-section/ridge-line-section.tsx";
import SpiderSection from "./components/sections/spider-section/spider-section.tsx";
import BoxPlotSection from "./components/sections/boxplot-section/boxplot-section.tsx";
import HeatmapSection from "./components/sections/heatmap-section/heatmap-section.tsx";
import CorrelationSection from "./components/sections/correlation-section/heatmap-section.tsx";
import ScatterPlotSection from "./components/sections/scatterplot-section/scatterplot-section.tsx";

function App() {
  const [track, setTrack] = useState(
    "3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb",
  );
  const [dataset, setDataset] = useState<Entry[]>();

  useEffect(() => {
    d3.csv("./dataset.csv")
      .then((df) => {
        setDataset(preprocessDataset(df));
      })
      .catch(console.error);
  }, []);

  console.log(dataset === undefined ? undefined : dataset[0]);

  if (dataset === undefined) {
    return (
      <div className="App">
        <div className="section">
          <Introduction />
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="section">
        <Introduction />
      </div>
      <div className="section">
        <SpiderSection dataset={dataset} />
      </div>
      <div className="section">
        <HeatmapSection dataset={dataset} />
      </div>
      <div className="section">
        <BoxPlotSection dataset={dataset} />
      </div>
      <div className="section">
        <RidgeLineSection dataset={dataset} />
      </div>
      <div className="section">
        <CorrelationSection dataset={dataset} />
      </div>
      <div className="section">
        <ScatterPlotSection dataset={dataset} />
      </div>
      <div className="section">
        <Footer setTrackId={setTrack} trackId={track} />
      </div>
    </div>
  );
}

export default App;
