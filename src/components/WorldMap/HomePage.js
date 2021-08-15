import React from 'react';
import { WorldMap } from 'react-svg-worldmap';

const data = [
    { country: 'cn', value: 1389618778 }, // china
    { country: 'in', value: 1311559204 } // india
];

const HomePage = () => {
    return (
        <WorldMap color="green" title="This is My Map" size="xl" data={data} />
    );
};

export default HomePage;
