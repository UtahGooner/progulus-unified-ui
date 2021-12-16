import React, {ChangeEvent, useEffect, useState} from "react";
// import "./RatingSlider.scss"
import "./simple-rating-slider.scss"
import numeral from "numeral";
import {useDispatch, useSelector} from "react-redux";
import {selectUserSongRating} from "./index";
import {saveRatingAction} from "./actions";

export interface RatingSliderProps {
    songId: number,
    showSlider?: boolean,
}

const RatingSlider: React.FC<RatingSliderProps> = ({songId, showSlider = false}) => {
    let timer: number = 0;
    const dispatch = useDispatch();
    const rating = useSelector(selectUserSongRating(songId));
    const [visible, setVisible] = useState(showSlider);
    const [clicked, setClicked] = useState(false);
    const [rated, setRated] = useState(rating);

    useEffect(() => {
        setRated(rating);
    }, [songId]);

    useEffect(() => {
        setVisible(showSlider);
    }, [showSlider])

    const commitChangeHandler = () => {
        dispatch(saveRatingAction(songId, rated));
    }

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        if (!ev.target) {
            return
        }
        setRated(Number(ev.target.value) || 0);
    }

    const ratingLabel = (value: number): string => {
        switch (value) {
        case 0:
            return 'Not Rated';
        case 0.5:
            return 'Horrible';
        case 1.0:
            return 'Awful';
        case 1.5:
            return 'Bad';
        case 2.0:
            return 'Not Good';
        case 2.5:
            return 'Umm...';
        case 3.0:
            return 'So-so';
        case 3.5:
            return 'Not Bad';
        case 4.0:
            return 'Good';
        case 4.5:
            return 'Really Good';
        case 5.0:
            return 'Awesome!';
        default:
            return '';
        }
    }

    const accentColor = (rated: number): string => {
        const maxValue = 480; //510
        let red = 0, green = 0, blue = 0;
        const rate = rated / 5;
        if (rate < 0.5) {
            red = 255;
            blue = Math.round(maxValue * rate);
        } else {
            blue = 255;
            red = Math.round(maxValue - maxValue * rate);
        }
        const hue = red * 0x10000 + green * 0x100 + blue;
        return '#' + ('000000' + hue.toString(16)).slice(-6);
    }

    return (
        <div className="si--rating-bar">
            <div className="si--user-rating me-3" onMouseEnter={() => setVisible(true)}
                 onMouseOut={() => setVisible(false)}
                 onClick={() => setClicked(!clicked)}>
                {rated === 0 && (<span>Not Rated</span>)}
                {rated > 0 && (<span>{numeral(rated).format('0.0')}</span>)}
            </div>
            <div className="si--user-rating-tool">
                {(showSlider || clicked || visible) && (
                    <input type="range" min={0} max={5} step={0.5} value={rated}
                           style={{accentColor: accentColor(rated)}}
                           onChange={changeHandler}
                           onMouseUp={commitChangeHandler}  onTouchEnd={commitChangeHandler}/>
                )}
            </div>
        </div>
    )
}

export default RatingSlider;
