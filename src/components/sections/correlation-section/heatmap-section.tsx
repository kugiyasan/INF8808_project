import { FC } from "react";
import CorrelationHeatmap from "./Heatmap";

interface CorrelationSectionProps {
  dataset?: any[];
}

const CorrelationSection: FC<CorrelationSectionProps> = ({ dataset }) => {
  return (
    <div className="correlation-section">
      <h2>Correlation of genres with popularity</h2>
      <div className="correlation-container">
        {dataset === undefined ? null : (
          <CorrelationHeatmap dataset={dataset} />
        )}
      </div>
    </div>
  );
};

export default CorrelationSection;
