import React from 'react';
import numeral from "numeral";

export interface BasicSongRatingProps {
    rating: number,
    votes: number,
}
const BasicSongRating:React.FC<BasicSongRatingProps> = ({rating, votes}) => {
    if (!rating || !votes) {
        return (<div>Not Rated</div>)
    }
    return (
        <div>
            <span className="me-3">{numeral(rating).format('0.0')}</span>
            <small>
                ({votes}<span className="d-none d-md-inline ms-1">Vote{votes === 1 ? '' : 's'}</span>)
            </small>
        </div>
    )
}

export default BasicSongRating;
