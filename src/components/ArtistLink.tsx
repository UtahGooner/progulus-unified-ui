import React from "react";
import {Link} from "react-router-dom";

export interface ArtistLinkProps {
    artist: string,
}

const ArtistLink:React.FC<ArtistLinkProps> = ({artist}) => {
    const link = `/artist/${encodeURIComponent(artist)}`;
    return (
        <Link to={link}>{artist}</Link>
    )
}

export default React.memo(ArtistLink);
