import React from "react";
import {Link} from "react-router-dom";

export interface AlbumLinkProps {
    artist: string,
    album: string,
}

const AlbumLink:React.FC<AlbumLinkProps> = ({artist, album}) => {
    const link = `/artist/${encodeURIComponent(artist)}/${encodeURIComponent(album)}`;
    return (
        <Link to={link}>{album}</Link>
    )
}

export default React.memo(AlbumLink);
