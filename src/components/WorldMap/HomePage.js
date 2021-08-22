import React from 'react';
import { WorldMap } from 'react-svg-worldmap';
import { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, withRouter } from 'react-router-dom';
import { BASE_URL, EXTERNAL_URL } from '../../config/Constants';

function HomePage() {
    const history = useHistory();
    const { path } = useRouteMatch();
    const [countriesInfo, setCountriesInfo] = useState([]);

    useEffect(() => {
        const getCountriesInfo = async () => {
            // Look into local db

            let allCountries = [];
            try {
                const userCountries = await fetchDataFromUrl(
                    `${BASE_URL}/countries`
                );
                console.log(`Fetched countries from Local server`);
                // console.log(userCountries[0]);

                // Fetch from external api if not found
                allCountries =
                    Object.keys(userCountries).length === 0
                        ? await getExternalCountries()
                        : userCountries;
            } catch (error) {
                console.log(`Couldn't fetch data from Local server`);
                allCountries = await getExternalCountries();
            }

            setCountriesInfo(
                allCountries.map((data) => {
                    return {
                        // Tightly coupled with WorldMap
                        country: data.alpha2Code,
                        value: data.population,

                        id: data.id,
                        name: data.name,
                        capital: data.capital,
                        flag: data.flag,
                        region: data.region,
                        languages: data.languages,
                        callingCodes: data.callingCodes
                    };
                })
            );
        };

        const getExternalCountries = async () => {
            console.log(`Fetching countries from External API`);
            return await fetchDataFromUrl(`${EXTERNAL_URL}`);
        };

        getCountriesInfo();
    }, []);

    const fetchDataFromUrl = async (url) => {
        const res = await fetch(url);
        return await res.json();
    };

    const localizationCallback = (countryName, isoCode, value) => {
        let info = countriesInfo.find((d) => d.country === isoCode);
        return `${info?.country}: ${info?.name}, ${info?.capital}, ${info?.region}, ${info?.value}`;
    };

    const onClickCountry = (event, countryName, isoCode, value) => {
        history.push({
            pathname: `${path}/country`,
            state: countriesInfo.find((info) => info.country === isoCode)
        });
    };

    return (
        <WorldMap
            color="green"
            title="Countries in the World"
            size="xl"
            data={countriesInfo}
            tooltipTextFunction={localizationCallback}
            onClickFunction={onClickCountry}
        />
    );
}

export default withRouter(HomePage);
