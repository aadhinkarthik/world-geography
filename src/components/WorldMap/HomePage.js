import React from 'react';
import { WorldMap } from 'react-svg-worldmap';
import { useState, useEffect } from 'react';

function HomePage() {
    const [countriesInfo, setCountriesInfo] = useState([]);

    useEffect(() => {
        const getCountriesInfo = async () => {
            const allData = await fetchCountriesInfo();
            setCountriesInfo(
                allData.map((data) => {
                    return {
                        country: data.alpha2Code,
                        value: data.population,
                        name: data.name,
                        flag: data.flag,
                        capital: data.capital,
                        region: data.region,
                        languages: data.languages,
                        callingCodes: data.callingCodes
                    };
                })
            );
        };

        getCountriesInfo();
    }, []);

    const fetchCountriesInfo = async () => {
        const res = await fetch('https://restcountries.eu/rest/v2/all');
        const data = await res.json();

        return data;
    };

    const localizationCallback = (countryName, isoCode, value) => {
        let info = countriesInfo.find((d) => d.country === isoCode);
        return `${info?.country}: ${info?.name}, ${info?.capital}, ${info?.region}, ${info?.value}`;
    };

    return (
        <WorldMap
            color="green"
            title="This is My Map"
            size="xl"
            data={countriesInfo}
            tooltipTextFunction={localizationCallback}
        />
    );
}

export default HomePage;
