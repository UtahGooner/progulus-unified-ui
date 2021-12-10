import React, {useState} from "react";
import {BasicSong, CurrentSong} from "../types";
import './song-info.scss';
import SongDuration from "./SongDuration";
import RatingSlider from "../ducks/rating/RatingSlider";
import SongRatingText from "../ducks/rating/SongRatingText";

export interface SongInfoProps {
    song: CurrentSong,
    showDuration?: boolean,
    progress?: number,
}

const SongInfo: React.FC<SongInfoProps> = ({song, showDuration, progress = 1}) => {
    const [showCountUp, setShowCountUp] = useState(false);
    const [showSlider, setShowSlider] = useState(true);

    const duration = showCountUp ? song.duration * progress : song.duration;

    return (
        <div className="song-info">
            <div className="row g-3">
                <div className="col">
                    <h3 className="si--title">{song.title}</h3>
                </div>
                <div className="col-auto col-rating">
                    {showDuration && (<SongDuration duration={duration} onClick={() => setShowCountUp(!showCountUp)}/>)}
                </div>
            </div>

            <div className="si--row si--artist">
                <div className="si--icon bi-person-circle"/>
                <div className="si--content">{song.artist}</div>
            </div>
            <div className="si--row si--album">
                <div className="si--icon bi-disc-fill"/>
                <div className="si--content">{song.album} ({song.albumYear})</div>
            </div>
            <div className="si--row si--rating">
                <div className="si--icon bi-star-fill"/>
                <div className="si--content">
                    {/*<SongRatingText songId={song.id} showVotes={false}/>*/}
                </div>
            </div>
            <div className="si--row si--rating-tool">
                <div className="si--icon bi-star d-inline-block" onClick={() => setShowSlider(!showSlider)}/>
                <div className="si--content">
                    <RatingSlider songId={song.id} showSlider={showSlider}/>
                </div>
            </div>
            <div className="si--row si--requester">
                <div className="si--icon bi-person-workspace"/>
                <div className="si--content">
                    <div>({song.requester})</div>
                    {!!song.msg && (
                        <div>{song.msg}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SongInfo;
