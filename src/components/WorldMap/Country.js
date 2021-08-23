import { useState, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import { useHistory } from 'react-router-dom';

import './Country.css';
import Input from '../Utilities/Input';
import Button from '../Utilities/Button';
import { BASE_URL } from '../../config/Constants';

const Country = (props) => {
    const [countryInfo, setCountryInfo] = useState(props.location.state || {});
    const constructPhotoGrid = (url) => {
        return {
            src: url,
            width: 4,
            height: 1
        };
    };
    const [photos, setPhotos] = useState([
        //TODO: Add photos based on Country name from Google API
        constructPhotoGrid(countryInfo.flag)
    ]);

    const [contentEditable, isContentEditable] = useState(false);
    useEffect(() => {
        isContentEditable(false);
    }, []);

    const history = useHistory();
    const myChangeHandler = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setCountryInfo({
            ...countryInfo,
            [fieldName]: fieldValue
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // TODO: Validation
        isContentEditable(false);
        updateCountryInfo(countryInfo).then(() => history.push('/'));
    };

    const updateCountryInfo = async (countryInfo) => {
        console.log(
            `Deleting country information by country code: ${countryInfo.country}`
        );

        // Delete country information before inserting
        await fetch(`${BASE_URL}/countries/${countryInfo.id}`, {
            method: 'DELETE'
        });

        // Insert updated country information
        await fetch(`${BASE_URL}/countries`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(constructCountriesData(countryInfo))
        });
        console.log('Updated Country Information');
    };

    const constructCountriesData = (data) => {
        return {
            alpha2Code: data.country,
            population: data.value,

            id: data.id,
            name: data.name,
            capital: data.capital,
            flag: data.flag,
            region: data.region,
            languages: data.languages,
            callingCodes: data.callingCodes
        };
    };

    return (
        <div className="container">
            <div className="image">
                <Gallery photos={photos} />
            </div>
            <div className="content scroll">
                <header className="country-header">
                    <h3>Country Information</h3>
                    <Button
                        color={contentEditable ? 'orange' : 'green'}
                        text={contentEditable ? 'Cancel' : 'Edit'}
                        onClick={() => {
                            isContentEditable(!contentEditable);
                        }}
                    />
                </header>
                <form className="add-form" onSubmit={onSubmit}>
                    <div className="form-control">
                        <label>Code: </label>
                        <Input
                            className={`${
                                contentEditable ? '' : 'input-hidden-disabled'
                            }`}
                            type="text"
                            name="country"
                            value={countryInfo.country}
                            disabled={true}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-control">
                        <label>Population: </label>
                        <Input
                            className={`${
                                contentEditable ? '' : 'input-hidden-disabled'
                            }`}
                            type="number"
                            name="value"
                            value={countryInfo.value}
                            disabled={!contentEditable}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-control">
                        <label>Name: </label>
                        <Input
                            className={`${
                                contentEditable ? '' : 'input-hidden-disabled'
                            }`}
                            type="text"
                            name="name"
                            value={countryInfo.name}
                            disabled={!contentEditable}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-control">
                        <label>Capital: </label>
                        <Input
                            className={`${
                                contentEditable ? '' : 'input-hidden-disabled'
                            }`}
                            type="text"
                            name="capital"
                            value={countryInfo.capital}
                            disabled={!contentEditable}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-control">
                        <label>Region: </label>
                        <Input
                            className={`${
                                contentEditable ? '' : 'input-hidden-disabled'
                            }`}
                            type="text"
                            name="region"
                            value={countryInfo.region}
                            disabled={!contentEditable}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-control">
                        <label>Languages: </label>
                        <div style={{ width: 'min-content' }}>
                            {countryInfo.languages.map((data, id) => {
                                return (
                                    <input
                                        className={`${
                                            contentEditable
                                                ? ''
                                                : 'input-hidden-disabled'
                                        }`}
                                        key={`${id}_${data.name}`}
                                        type="text"
                                        name={`language_${id}`}
                                        value={data.name}
                                        disabled={!contentEditable}
                                        onChange={(e) => myChangeHandler(e)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="form-control">
                        <label>Calling Codes: </label>
                        <div style={{ width: 'min-content' }}>
                            {countryInfo.callingCodes.map((data, id) => {
                                return (
                                    <input
                                        className={`${
                                            contentEditable
                                                ? ''
                                                : 'input-hidden-disabled'
                                        }`}
                                        key={`${id}_${data.name}`}
                                        type="number"
                                        name={`callCode_${id}`}
                                        value={data}
                                        disabled={!contentEditable}
                                        onChange={(e) => myChangeHandler(e)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <input
                        className="btn"
                        type={contentEditable ? 'submit' : 'hidden'}
                        value="Save Task"
                    />
                </form>
            </div>
        </div>
    );
};

export default Country;
