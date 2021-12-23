import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAlbumsList, selectArtistsList, selectFilterArtist} from "./selectors";
import {fetchSearchAlbumsAction} from "./actions";
import AlbumCover from "../../components/AlbumCover";
import {AlbumIcon, RatedIcon, RatingIcon} from "../../components/Icons";
import numeral from "numeral";
import BasicSongRating from "../rating/BasicSongRating";
import ArtistAlbumYears from "./ArtistAlbumYears";
import RequestArtist from "./RequestArtist";

const RequestAlbumList: React.FC = () => {
    const albumList = useSelector(selectAlbumsList);

    return (
        <div>
            <h3 className="visually-hidden">Artists</h3>
            <div className="progulus--request-artist-list">
                {albumList.map(row => {
                    return (
                        <RequestArtist key={row.artist} data={row} />
                    )
                })}
            </div>
        </div>
    )
}

export default RequestAlbumList;
