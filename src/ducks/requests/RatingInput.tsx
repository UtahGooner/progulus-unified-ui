import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilterRating} from "./selectors";
import {selectRatingAction} from "./actions";

const RatingInput: React.FC = () => {
    const dispatch = useDispatch();
    const rating = useSelector(selectFilterRating);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(selectRatingAction(ev.target.valueAsNumber));
    }

    return (
        <>
            <input type="number" className="form-control form-control-sm"
                   value={rating === null ? '' : rating} onChange={changeHandler}
                   placeholder="Avg Rating"
                   min={0} max={5} step={0.25} list="progulus--request-rating"/>
            <datalist id="progulus--request-rating">
                <option value="0">No Rating</option>
                {[0.5, 1, 1.5, 2, 2.5, 3.0, 3.5, 4.0, 4.5, 5].map(value => <option key={value} value={value} /> )}
            </datalist>
        </>
    )
}

export default RatingInput;
