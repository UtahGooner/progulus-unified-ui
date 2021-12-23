import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilterYear, selectYearList} from "./selectors";
import {selectYearAction} from "./actions";

const YearSelect: React.FC = () => {
    const dispatch = useDispatch();
    const year = useSelector(selectFilterYear);
    const yearList = useSelector(selectYearList);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(selectYearAction(ev.target.value));
    }

    return (
        <select className="form-select form-select-sm" value={year} onChange={changeHandler}>
            <option value="">All Years</option>
            {yearList.map((year, index) => <option key={index} value={year}>{year}</option>)}
        </select>
    )
}

export default YearSelect;
