import React, {useEffect, useState} from "react";
import {CurrentSong} from "../types";
import AlbumCover from "../components/AlbumCover";
import Progress from "../components/Progress";
import SongInfo from "../components/SongInfo";
import SongDuration from "../components/SongDuration";

const calcProgress = (now: number, startTime: number, endTime: number) => endTime === startTime ? 0 : ((now - startTime) / (endTime - startTime));

export interface NowPlayingProps {
    song: CurrentSong,
    loading: boolean,
    onLoadNext: () => void,
}

const NowPlaying:React.FC<NowPlayingProps> = ({song, loading, onLoadNext}) => {
    let timerHandle: number;
    const {artist, album, albumYear, picture} = song;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return () => {
            window.clearInterval(timerHandle);
        }
    }, []);

    useEffect(() => {
        window.clearInterval(timerHandle)
        timerHandle = window.setInterval(updateProgress, 1000);
    }, [song.id]);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (progress > 1 ) {
            window.clearInterval(timerHandle);
            setProgress(() => 0);
            onLoadNext();
        }
    }, [progress]);

    const updateProgress = () => {
        console.log('updateProgress', song.id)
        const {dateLastPlayed, duration, offset} = song;
        const now = new Date().valueOf();
        const startTime = new Date((dateLastPlayed) * 1000 + (offset || 0)).valueOf();
        const endTime = startTime + duration;
        const progress = calcProgress(new Date().valueOf(), startTime, endTime);
        setProgress(progress);
    }

    return (
        <div className="row g-3">
            <div className="col-sm-6 np--album-cover-container">
                <AlbumCover artist={artist} album={album} albumYear={albumYear} picture={picture}/>
                <div className="row">
                    <div className="col-auto mono">
                        <SongDuration duration={song.duration * progress}/>
                    </div>
                    <div className="col">
                        <Progress width={loading ? 1 : progress} animated={loading} style={{height: '5px'}}/>
                    </div>
                    <div className="col-auto mono">
                        <SongDuration duration={song.duration * (1 - progress)}/>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <SongInfo song={song} showDuration={true} progress={progress}/>
            </div>
        </div>
    )
}

export default NowPlaying;
