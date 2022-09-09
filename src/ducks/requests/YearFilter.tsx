import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {selectFilterYear, selectYearList, setCurrentYear} from "./index";
import {useAppDispatch} from "../../app/configureStore";

const YearFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const year = useSelector(selectFilterYear);
    const yearList = useSelector(selectYearList);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentYear(ev.target.value));
    }

    const years = year.split(',').map(val => val.trim());
    return (
        <div>
            <input type="search" className="form-control form-control-sm"
                   value={year} onChange={changeHandler}
                   list="search-year-list"/>
            <datalist id="search-year-list">
                <option value="">All Years</option>
                <option value="new">New Additions</option>
                {!!years.length && (
                    yearList
                        .filter(year => !years.includes(year))
                        .map((y) => <option key={y} value={`${year},${y}`}>{y}</option>)
                )}
                {!years.length && yearList
                    .map((y) => <option key={y} value={y}>{y}</option>)}
            </datalist>
        </div>
    )
}

export default React.memo(YearFilter);
