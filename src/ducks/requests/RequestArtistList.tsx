import React from "react";
import {useSelector} from "react-redux";
import {selectArtistsList} from "./index";
import RequestArtist from "./RequestArtist";

const RequestArtistList: React.FC = () => {
    const artistList = useSelector(selectArtistsList);
    return (
        <div>
            <h3 className="visually-hidden">Artists</h3>
            <div className="progulus--request-artist-list">
                {artistList.map(row => {
                    return (
                        <RequestArtist key={row.artist} data={row}/>
                    )
                })}
            </div>
        </div>
    )
}

export default RequestArtistList;
