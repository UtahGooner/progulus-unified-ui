import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilterRated, setCurrentRated} from "./index";


const RatedInput: React.FC = () => {
    const dispatch = useDispatch();
    const rated = useSelector(selectFilterRated);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentRated(ev.target.value));
    }

    return (
        <>
            <input type="number" className="form-control form-control-sm" value={rated === null ? '' : rated}
                   onChange={changeHandler}
                   placeholder="Your rating"
                   min={0} max={5} step={0.25} list="progulus--request-rated"/>
            <datalist id="progulus--request-rated">
                <option value="0">Not Rated</option>
                {[0.5, 1, 1.5, 2, 2.5, 3.0, 3.5, 4.0, 4.5, 5].map(value => <option key={value} value={value}/>)}
            </datalist>
        </>
    )
}

export default RatedInput;
