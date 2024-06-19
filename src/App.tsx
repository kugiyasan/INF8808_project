import { Suspense, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LinePlot from "./LinePlot/LinePlot";
import * as d3 from "d3";
import SpiderChart from "./SpiderChart/SpiderChart";
import { Entry, preprocessDataset } from "./dataset";

function App() {
  const [count, setCount] = useState(0);

  const [dataset, setDataset] = useState<Entry[]>();

  useEffect(() => {
    d3.csv("/dataset.csv")
      .then((df) => {
        setDataset(preprocessDataset(df));
      })
      .catch(console.error);
  }, []);

  console.log(dataset === undefined ? undefined : dataset[0]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <LinePlot data={[1, 5, 143, 76, 34, 87]} />
      {dataset === undefined ? null : <SpiderChart dataset={dataset} />}
    </>
  );
}

export default App;
