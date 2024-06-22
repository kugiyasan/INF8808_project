import { FC } from "react";
import CorrelationHeatmap from "./Heatmap";
import { Entry } from "../../../dataset";

interface CorrelationSectionProps {
  dataset: Entry[];
}

const CorrelationSection: FC<CorrelationSectionProps> = ({ dataset }) => {
  return (
    <>
      <h2>Correlation of genres with popularity</h2>
      <div className="correlation-container">
        <CorrelationHeatmap dataset={dataset} />
      </div>
    </>
  );
};

export default CorrelationSection;
