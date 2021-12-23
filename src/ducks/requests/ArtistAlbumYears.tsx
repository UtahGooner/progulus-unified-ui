import React from "react";

export interface ArtistAlbumYearsProps {
    albumYears: string,
}

const ArtistAlbumYears:React.FC<ArtistAlbumYearsProps> = ({albumYears}) => {
    if (!albumYears) {
        return null;
    }
    const years = albumYears.split(',').sort();
    if (years.length === 1) {
        return (
            <span>{years[0]}</span>
        );
    }
    return (
        <span>{years[0]}&mdash;{years[years.length - 1]}</span>
    )
}

export default ArtistAlbumYears;
