import React from "react";

interface AlbumCoverProps {
    artist: string,
    album: string,
    albumYear: string,
    picture: string,
    loading?: 'lazy' | 'eager'
    onClick?: () => void,
}

const AlbumCover: React.FC<AlbumCoverProps> = ({
                                                   artist,
                                                   album,
                                                   albumYear,
                                                   picture,
                                                   loading = 'lazy',
                                                   onClick
                                               }) => {
    const src = `https://progulus.com/pictures/${encodeURIComponent(picture)}`;
    const clickHandler = () => {
        if (onClick) {
            onClick();
        }
    }
    return (
        <img className="img-fluid" src={src} alt={`${album} by ${artist} (${albumYear})`}
             loading={loading} onClick={clickHandler}/>
    )
}

export default AlbumCover;
