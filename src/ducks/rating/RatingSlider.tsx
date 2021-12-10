import React, {ChangeEvent, useEffect, useState} from "react";
import "./RatingSlider.scss"
import numeral from "numeral";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {selectSongRating, selectUserSongRating} from "./index";
import {saveRatingAction} from "./actions";

export interface RatingSliderProps {
    songId: number,
    showSlider?: boolean,
}

const RatingSlider:React.FC<RatingSliderProps> = ({songId, showSlider = false}) => {
    let timer:number = 0;
    const dispatch = useDispatch();
    const rating = useSelector(selectUserSongRating(songId));
    const [visible, setVisible] = useState(showSlider);
    const [rated, setRated] = useState(rating);

    useEffect(() => {
        setVisible(showSlider);
    }, [showSlider])

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);
        setRated(Number(ev.target.value));
        timer = window.setTimeout(() => {
            dispatch(saveRatingAction(songId, Number(ev.target.value)));
        }, 500);
    }

    return (
        <div className="si--rating-bar" onClick={() => setVisible(!visible)}
             onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <div className="si--user-rating">{numeral(rating).format('0.0')}</div>
            <div className={classNames("col", {'d-none': !visible})}>
                <input type="range" className="range blue" min={0} max={5} step={0.5}
                       value={rating || 0} onChange={changeHandler}/>
            </div>
        </div>
    )
}
export default RatingSlider;
