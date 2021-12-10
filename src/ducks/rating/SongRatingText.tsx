import React, {useState} from "react";
import numeral from "numeral";
import {selectSongRating} from "./index";
import {useSelector} from "react-redux";


export interface SongRatingTextProps {
    songId: number,
    showVotes?: boolean,
}

const SongRatingText:React.FC<SongRatingTextProps> = ({songId, showVotes = false}) => {
    const {rating, ratings} = useSelector(selectSongRating(songId));
    const [showDetail, setShowDetail] = useState(showVotes);

    if (!rating || !rating.votes) {
        return (<div>Not Rated</div>)
    }

    return (
        <div>
            <div>{numeral(rating.rating).format('0.0')} ({rating.votes} Vote{rating.votes === 1 ? '' : 's'})</div>
            {showDetail && (
                <div></div>
            )}
        </div>
    )
}

export default SongRatingText;
