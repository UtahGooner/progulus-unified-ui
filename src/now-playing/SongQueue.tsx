import React from 'react';
import {CurrentSong} from "../types";
import './song-queue.scss';

export interface SongQueueProps {
    queue: CurrentSong[],
    onRefresh: () => void,
}

const SongQueue:React.FC<SongQueueProps> = ({queue, onRefresh}) => {

    return (
        <div className="np--queue-list">
            <div className="header" onClick={() => onRefresh()}>Current Queue:</div>
            {queue.map(song => (
                <div key={song.id} className="song">
                    {song.artist} <small>({song.requester})</small>
                </div>
            ))}
        </div>
    )
}

export default SongQueue;
