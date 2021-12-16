import React from "react";
import {Link} from "react-router-dom";

export interface ArtistLinkProps {
    artist: string,
}

const ArtistLink:React.FC<ArtistLinkProps> = ({artist}) => {
    const link = `/ui/artist/${encodeURIComponent(artist)}`;
    return (
        <Link to={link}>{artist}</Link>
    )
}

export default ArtistLink;
