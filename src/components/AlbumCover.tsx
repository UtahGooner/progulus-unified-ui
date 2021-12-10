import React from "react";

interface AlbumCoverProps {
    artist: string,
    album:string,
    albumYear: string,
    picture: string,
}
const AlbumCover:React.FC<AlbumCoverProps> = ({artist, album, albumYear, picture}) => {
    const src = `https://progulus.com/pictures/${encodeURIComponent(picture)}`
    return (
        <img className="img-fluid" src={src} alt={`${album} by ${artist} (${albumYear})`}/>
    )
}

export default AlbumCover;
