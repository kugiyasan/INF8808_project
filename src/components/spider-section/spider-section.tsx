import React from 'react';
import './spider-section.css'; // Import CSS for styling
import LinePlot from '../../LinePlot/LinePlot';
import SpiderChart from '../../SpiderChart/SpiderChart';
import Dropdown from '../Dropdown/dropdown';

interface SpiderSectionProps {
  dataset?: any[];
}


const SpiderSection: React.FC<SpiderSectionProps> = ({ dataset }) => {
  const preSelectedOptions = [
    { name: 'Rock' }, { name: 'Pop' }, { name: 'Classical' }
];
    const [genre, setGenre] = React.useState('');
    const options = [
      { name: 'Rock' }, { name: 'Pop' }, { name: 'Hip-Hop' }, { name: 'Jazz' }, { name: 'Classical' }, { name: 'Electronic' },
      { name: 'R-N-B' }, { name: 'Country' }, { name: 'Folk' }, { name: 'Reggae' }, { name: 'Blues' }, { name: 'Metal' },
      { name: 'Punk' }, { name: 'Disco' }, { name: 'Soul' }, { name: 'Funk' }, { name: 'Techno' }, { name: 'House' },
      { name: 'Dance' }, { name: 'Trance' }, { name: 'Dubstep' }, { name: 'Drum and Bass' }
  ];
  return (
    <div className="spider-section">
        <h2>{genre}</h2>
        <Dropdown onUpdate={setGenre} options={options} placeholder={'Select up to 5 genres'} limit={5} singleSelect={false} />
        <div className='visual-container'>
            <LinePlot data={[1, 5, 143, 76, 34, 87]} />
            {dataset === undefined ? null : <SpiderChart dataset={dataset} />}
        </div>
    </div>
  );
};

export default SpiderSection;
