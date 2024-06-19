import React from 'react';
import './spider-section.css'; // Import CSS for styling
import LinePlot from '../../LinePlot/LinePlot';
import SpiderChart from '../../SpiderChart/SpiderChart';
import Multiselect from 'multiselect-react-dropdown';

interface SpiderSectionProps {
  dataset?: any[];
}

const options = [{name: 'Option 1', id: 1}, {name: 'Option 2', id: 2}, {name: 'Option 3', id: 3}];
const customStyles = {
    multiselectContainer: {
      width: '300px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    searchBox: {
      border: 'none',
      fontSize: '10px',
      minHeight: '50px'
    },
    inputField: {
      margin: '5px'
    },
    chips: {
      backgroundColor: 'grey'
    },
    optionContainer: {
      border: '2px solid'
    },
    option: {
      color: 'black'
    },
    groupHeading: {
      // Custom styles for group heading
    }
  };

const SpiderSection: React.FC<SpiderSectionProps> = ({ dataset }) => {
  return (
    <div className="visual-section">
        <Multiselect 
            options={options}
            displayValue="name"
            style={customStyles}
            />
        <div className='visual-container'>
            <LinePlot data={[1, 5, 143, 76, 34, 87]} />
            {dataset === undefined ? null : <SpiderChart dataset={dataset} />}
        </div>
    </div>
  );
};

export default SpiderSection;
