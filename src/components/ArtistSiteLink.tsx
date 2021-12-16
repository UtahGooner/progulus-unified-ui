import React from "react";

export interface ArtistSiteLinkProps {
    url?: string,
}

const ArtistSiteLink: React.FC<ArtistSiteLinkProps> = ({url}) => {
    if (!url) {
        return null;
    }
    if (!/\/\//.test(url)) {
        url = `//${url}`;
    }
    return (
        <a href={url} target="_blank" className="bi-link-45deg"/>
    )
}

export default ArtistSiteLink;
