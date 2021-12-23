import React, {useState} from "react";
import {CurrentSong} from "../types";
import ArtistLink from "./ArtistLink";
import RatingSlider from "../ducks/rating/RatingSlider";
import FlagIcon from "./FlagIcon";
import SongRatingText from "../ducks/rating/SongRatingText";
import ArtistSiteLink from "./ArtistSiteLink";
import AlbumLink from "./AlbumLink";

export interface SongInfoProps {
    song: CurrentSong
}

const SongInfo: React.FC<SongInfoProps> = ({song}) => {
    const [showSlider, setShowSlider] = useState(false);


    return (
        <div className="song-info">
            <h3 className="si--title">{song.title}</h3>

            <div className="si--row si--artist">
                <div className="si--icon bi-person-circle"/>
                <div className="si--content">
                    <ArtistLink artist={song.artist}/>
                    <small className="ms-3">
                        <ArtistSiteLink url={song.website} />
                        <FlagIcon countryCode={song.country} />
                    </small>
                </div>
            </div>
            <div className="si--row si--album">
                <div className="si--icon bi-disc-fill"/>
                <div className="si--content">
                    <AlbumLink artist={song.artist} album={song.album} />
                    <span className="ms-3">({song.albumYear})</span>
                </div>
            </div>
            <div className="si--row si--rating">
                <div className="si--icon bi-star-fill"/>
                <div className="si--content">
                    <SongRatingText songId={song.id} showVotes={false}/>
                </div>
            </div>
            <div className="si--row si--rating-tool">
                <div className="si--icon bi-star d-inline-block" onClick={() => setShowSlider(!showSlider)} />
                <div className="si--content">
                    <RatingSlider songId={song.id} showSlider={true}/>
                </div>
            </div>
            {song.requester && (
                <div className="si--row si--requester">
                    <div className="si--icon bi-person-workspace"/>
                    <div className="si--content">
                        <div>{song.requester}</div>
                        {!!song.msg && (
                            <div>{song.msg}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default React.memo(SongInfo);
