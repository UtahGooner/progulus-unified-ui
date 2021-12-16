import React from "react";
import ArtistLink from "../../components/ArtistLink";

export interface QueuedArtistProps {
    artist: string,
    nextArtist?: string,
    prevArtist?: string,
    requester: string,
}

const QueuedArtist:React.FC<QueuedArtistProps> = ({artist, nextArtist, prevArtist, requester}) => {
    if (artist === prevArtist) {
        return null;
    }
    return (
        <div className="me-3">
            <ArtistLink artist={artist} />
            {requester !== 'HAL' && (
                <small className="ms-1">
                    (
                    {artist === nextArtist && (<span>x2/</span>)}
                    <span className="queue--requester">{requester}</span>
                    )
                </small>
            )}
        </div>
    )
}

export default QueuedArtist;
