import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectHistoryCount} from "./index";
import {historyCountChangedAction, loadCurrentAction} from "./index";
import {useAppDispatch} from "../../app/configureStore";

const HistoryCount:React.FC = () => {
    const dispatch = useAppDispatch();
    const historyCount = useSelector(selectHistoryCount);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        const value = Number(ev.target.value);
        dispatch(historyCountChangedAction(value || 10));
        dispatch(loadCurrentAction());
    }

    return (
        <select className="form-select form-select-sm" value={historyCount} onChange={changeHandler}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="50">50</option>
        </select>
    )
}

export default HistoryCount;
