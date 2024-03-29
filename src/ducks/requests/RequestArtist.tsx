import React from "react";
import {SearchResult} from "../../types";
import AlbumCover from "../../components/AlbumCover";
import {AlbumIcon, RatedIcon, RatingIcon} from "../../components/Icons";
import ArtistAlbumYears from "./ArtistAlbumYears";
import BasicSongRating from "../rating/BasicSongRating";
import {fetchSearchAlbumsAction} from "./actions";
import {useNavigate} from "react-router-dom";
import ArtistLink from "../../components/ArtistLink";
import AlbumLink from "../../components/AlbumLink";
import {useAppDispatch} from "../../app/configureStore";

export interface RequestArtistProps {
    data: SearchResult,
}

const RequestArtist: React.FC<RequestArtistProps> = ({data}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSelectArtist = (artist: string) => {
        dispatch(fetchSearchAlbumsAction(artist));
        navigate('/request/albums');
    }

    return (
        <div key={data.artist} className="artist">
            <div className="si--artist">
                <ArtistLink artist={data.artist}/>
            </div>
            {!!data.album && (
                <div className="si--album">
                    <AlbumLink artist={data.artist} album={data.album}/>
                </div>
            )}
            <div className="album-cover--container" onClick={() => onSelectArtist(data.artist)}>
                <AlbumCover artist={data.artist} album={data.album || ''} albumYear={data.albumYear}
                            picture={data.picture}/>
            </div>
            <div className="song-info" onClick={() => onSelectArtist(data.artist)}>
                {!data.album && (
                    <div className="row gx-3 gy-1">
                        <div className="col-auto si--icon"><AlbumIcon/></div>
                        <div className="col-auto">
                            <span className="me-3"> {data.albums}</span>
                            <small>(<ArtistAlbumYears albumYears={data.albumYear}/>)</small>
                        </div>
                    </div>
                )}
                <div className="row gx-3 gy-1">
                    <div className="col-auto si--icon"><RatingIcon/></div>
                    <div className="col-auto">
                        <BasicSongRating rating={data.rating} votes={data.votes}/>
                    </div>
                </div>
                {!!data.userRating && (
                    <div className="row gx-3 gy-1">
                        <div className="col-auto si--icon"><RatedIcon/></div>
                        <div className="col-auto">
                            <BasicSongRating rating={data.userRating} votes={data.userRating ? 1 : 0}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RequestArtist;
