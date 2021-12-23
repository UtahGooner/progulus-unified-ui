import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCountryList, selectFilterCountry} from "./selectors";
import {selectCountryAction} from "./actions";

const CountrySelect: React.FC = () => {
    const dispatch = useDispatch();
    const country = useSelector(selectFilterCountry);
    const countryList = useSelector(selectCountryList);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(selectCountryAction(ev.target.value));
    }

    return (
        <select className="form-select form-select-sm" value={country} onChange={changeHandler}>
            <option value="">All Countries</option>
            {countryList.map((country) => <option key={country} value={country}>{country}</option>)}
        </select>
    )
}

export default CountrySelect;
