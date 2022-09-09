import React from "react";
import {useSelector} from "react-redux";
import {selectAlbumsList} from "./index";
import RequestArtist from "./RequestArtist";

const RequestAlbumList: React.FC = () => {
    const albumList = useSelector(selectAlbumsList);

    return (
        <div>
            <h3 className="visually-hidden">Artists</h3>
            <div className="progulus--request-artist-list">
                {albumList.map(row => {
                    return (
                        <RequestArtist key={row.artist} data={row}/>
                    )
                })}
            </div>
        </div>
    )
}

export default RequestAlbumList;
