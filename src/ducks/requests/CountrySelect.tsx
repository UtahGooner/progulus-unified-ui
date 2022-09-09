import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {selectCountryList, selectFilterCountry, setCurrentCountry} from "./index";
import {useAppDispatch} from "../../app/configureStore";

const CountrySelect: React.FC = () => {
    const dispatch = useAppDispatch();
    const country = useSelector(selectFilterCountry);
    const countryList = useSelector(selectCountryList);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentCountry(ev.target.value));
    }
    const countries = country.split(',').map(val => val.trim());

    return (
        <div>
            <input type="search" className="form-control form-control-sm" value={country}
                   onChange={changeHandler} list="search-country-list"/>
            <datalist id="search-country-list">
                <option value="">All Countries</option>
                {countries.length > 0 && (
                    countryList
                        .filter(val => !countries.includes(val))
                        .map((y) => <option key={y} value={`${country},${y}`}>{y}</option>)
                )}
                {!countries.length && countryList.map((country) => <option key={country}
                                                                           value={country}>{country}</option>)}
            </datalist>
        </div>
    )
}

export default React.memo(CountrySelect);
