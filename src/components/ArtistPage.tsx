import React from "react";
import {useParams} from "react-router-dom";


type ArtistParams = {
    artist: string;
    album?: string;
}
const ArtistPage:React.FC = () => {
    const {artist, album} = useParams<ArtistParams>();

    return (
        <>
            <h3>@TODO: render artist page for {artist}</h3>
            {album && (<h4>@TODO: render album page for {album}</h4>)}
        </>
    )
}

export default ArtistPage;
