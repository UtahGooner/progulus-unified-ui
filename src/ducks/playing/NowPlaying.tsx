import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentSong, selectLoading} from "./index";
import {loadCurrentAction} from "./actions";
import AlbumCover from "../../components/AlbumCover";
import SongInfo from "../../components/SongInfo";
import Progress from "../../components/Progress";
import './now-playing.scss';


const calcProgress = (now: number, startTime: number, endTime: number) => endTime === startTime ? 0 : ((now - startTime) / (endTime - startTime));

const NowPlaying: React.FC = () => {
    let timerHandle: number;
    const dispatch = useDispatch();
    const currentSong = useSelector(selectCurrentSong);
    const loading = useSelector(selectLoading);

    const [progress, setProgress] = useState(0);


    useEffect(() => {
        if (!timerHandle) {
            timerHandle = window.setInterval(() => {
                if (loading) {
                    return;
                }
                if (currentSong) {
                    const {dateLastPlayed, duration, offset} = currentSong;
                    const now = new Date().valueOf();
                    const startTime = new Date((dateLastPlayed) * 1000 + (offset || 0)).valueOf();
                    const endTime = startTime + duration;
                    setProgress(calcProgress(new Date().valueOf(), startTime, endTime));
                    if (endTime - now <= 0) {
                        return dispatch(loadCurrentAction());
                    }
                }
            }, 1000);
        }
        return () => {
            window.clearInterval(timerHandle);
        }
    }, [currentSong?.id]);

    if (!currentSong) {
        return null;
    }

    const {artist, album, picture, albumYear, title, dateLastPlayed, duration, offset,} = currentSong || {};
    return (
        <div className="row g-3">
            <div className="col-sm-6 np--album-cover-container">
                <AlbumCover artist={artist} album={album} albumYear={albumYear} picture={picture}/>
                <Progress width={loading ? 1 : progress} animated={loading} style={{height: '3px'}}/>
            </div>
            <div className="col-sm-6">
                <SongInfo song={currentSong} showDuration={true} progress={progress}/>
            </div>
            <code>
                <pre>
                    {JSON.stringify(currentSong, undefined, 2)}
                </pre>
            </code>
            <button type="button" onClick={() => dispatch(loadCurrentAction())}>Reload Current Song</button>
        </div>
    )
}

export default NowPlaying;
