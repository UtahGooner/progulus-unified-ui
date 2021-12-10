import React, {useEffect, useState} from 'react';
import {CurrentSong, BasicSong} from "../types";
import {fetchNowPlaying} from "./actions";
import NowPlaying from "./NowPlaying";
import SongQueue from "./SongQueue";

const NowPlayingContainer:React.FC = () => {
    const [currentSong, setCurrentSong] = useState<CurrentSong|null>(null);
    const [recentSongs, setRecentSongs] = useState<CurrentSong[]>([]);
    const [queuedSongs, setQueuedSongs] = useState<CurrentSong[]>([]);
    const [alert, setAlert] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCurrentSongs().catch(err => console.log(err));
    }, []);


    const getCurrentSongs = async () => {
        console.log('getCurrentSongs()');
        setLoading(true);
        const {current, recent, queue, errorMessage} = await fetchNowPlaying();
        setCurrentSong(current || null);
        setRecentSongs(recent || []);
        setQueuedSongs(queue || []);
        setAlert(errorMessage || '');
        setLoading(() => false);
    }

    return (
        <div>
            <div className="row g-3">
                {!!alert && <div className="alert alert-danger">{alert}</div>}
                {!!currentSong && (
                    <NowPlaying song={currentSong} loading={loading} onLoadNext={getCurrentSongs} />
                )}
            </div>
            <SongQueue queue={queuedSongs} onRefresh={getCurrentSongs} />
        </div>
    )

}

export default NowPlayingContainer;
