import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentSong, selectLoading} from "./index";
import {loadCurrentAction} from "./actions";
import AlbumCover from "../../components/AlbumCover";
import SongInfo from "../../components/SongInfo";
import Progress from "../../components/Progress";
import './now-playing.scss';
import SongDuration from "../../components/SongDuration";
import classNames from "classnames";


const calcProgress = (now: number, startTime: number, endTime: number) => endTime === startTime ? 0 : ((now - startTime) / (endTime - startTime));

const NowPlaying: React.FC = () => {
    let timerHandle: number;
    const dispatch = useDispatch();
    const currentSong = useSelector(selectCurrentSong);
    const loading = useSelector(selectLoading);

    const [zoomed, setZoomed] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showCountUp, setShowCountUp] = useState(false);

    const currentDuration = currentSong ? (showCountUp ? currentSong.duration * progress : currentSong.duration) : 0;

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
        document.querySelectorAll('#progulus--listeners')
            .forEach((el) => {
                el.innerHTML = (currentSong?.listeners || '-').toString();
            })
        return () => {
            window.clearInterval(timerHandle);
        }
    }, [currentSong?.id]);

    if (!currentSong) {
        return null;
    }

    const {artist, album, picture, albumYear} = currentSong || {};
    return (
        <div>
            <div className="row g-3 g-lg-5">
                <div className={classNames("col-12 col-md-6 np--album-cover-container", {zoomed: zoomed})}>
                    <AlbumCover artist={artist} album={album} albumYear={albumYear} picture={picture}
                                loading="eager" onClick={() => setZoomed(!zoomed)}/>
                    <div className="row g-1">
                        <div className="col">
                            <Progress width={loading ? 1 : progress} animated={loading}/>
                        </div>
                        <div className="col-auto">
                            <SongDuration duration={currentDuration} onClick={() => setShowCountUp(!showCountUp)}/>
                        </div>
                    </div>
                </div>
                <div className={classNames("col-12 col-md-6 np--song-info", {zoomed: zoomed})}>
                    <SongInfo song={currentSong} />
                </div>
            </div>
        </div>
    )
}

export default NowPlaying;
