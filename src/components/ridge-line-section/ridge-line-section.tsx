import Dropdown from '../Dropdown/dropdown';
import React from 'react';
import RidgelinePlot from '../../RidgeLine/RidgeLine';

interface RidgeLineSectionProps {
    dataset?: any[];
}

const RidgeLineSection: React.FC<RidgeLineSectionProps> = ({ dataset }) => {
    const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
    const [kernelBandwidth, setKernelBandwidth] = React.useState<number>(7);
    const [numTicks, setNumTicks] = React.useState<number>(40);

    const options = [
        { name: 'Rock' }, { name: 'Pop' }, { name: 'Hip-Hop' }, { name: 'Jazz' }, { name: 'Classical' }, { name: 'Electronic' },
        { name: 'R-N-B' }, { name: 'Country' }, { name: 'Folk' }, { name: 'Reggae' }, { name: 'Blues' }, { name: 'Metal' },
        { name: 'Punk' }, { name: 'Disco' }, { name: 'Soul' }, { name: 'Funk' }, { name: 'Techno' }, { name: 'House' },
        { name: 'Dance' }, { name: 'Trance' }, { name: 'Dubstep' }, { name: 'Drum and Bass' }
    ];

    const handleUpdateGenres = (selected: string[]) => {
        setSelectedGenres(selected.map((genre) => genre.toLowerCase()));
    }

    return (
        <div className="visual-section">
            <h2>Selected Genres: {selectedGenres.join(', ')}</h2>
            <Dropdown onUpdate={handleUpdateGenres} options={options} placeholder={'Select up to 5 genres'} limit={5} singleSelect={false} />

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

            <div className='visual-container'>
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
