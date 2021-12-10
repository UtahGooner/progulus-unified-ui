import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentSong, selectLoading} from "./index";
import {loadCurrentAction} from "./actions";


const calcProgress = (now: number, startTime: number, endTime: number) => ((now - startTime) / (endTime - startTime));

const calcTime = (value: number, showHours:boolean = false) => {
    const minutes = Math.floor(value / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    return String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
}

export interface NowPlayingProgressProps {
    dateLastPlayed: number,
    duration: number,
    offset: number,
    on100pct: () => void,
}

const NowPlayingProgress:React.FC = () => {
    let timerHandle: number = 0;
    let timeoutHandle: number = 0;
    const dispatch = useDispatch();

    const loading = useSelector(selectLoading);
    const currentSong = useSelector(selectCurrentSong);
    const [progress, setProgress] = useState(1000);
    const [waiting, setWaiting] = useState(false);
    if (!currentSong) {
        return (<div>No current song.</div>)
    }

    const {id, dateLastPlayed, duration, offset} = currentSong;
    const now = new Date().valueOf();
    const startTime = new Date(dateLastPlayed * 1000).valueOf();
    const endTime = startTime + duration;

    useEffect(() => {
        return () => {
            window.clearInterval(timerHandle);
            window.clearTimeout(timeoutHandle);
        }
    }, []);

    useEffect(() => {
        window.clearInterval(timerHandle);
        setProgress(0);
        timerHandle = window.setInterval(() => {
            setProgress(calcProgress(new Date().valueOf(), startTime, endTime));
            if (progress < 1 && endTime - now > 1000) {
            }
            if (progress >= 1) {
                window.clearInterval(timerHandle);
                dispatch(loadCurrentAction());
            }
        }, 1000);
    }, [currentSong.id])

    //   if (!loading && !waiting && (progress >= 1 || endTime - now < 0)) {
    //     window.clearInterval();
    //     setWaiting(true);
    //     timeoutHandle = window.setTimeout(() => {
    //         dispatch(loadCurrentAction())
    //         setWaiting(false);
    //     }, 3000)
    //     // dispatch(loadCurrentAction())
    // }

    const style = {
        width: `${Math.min((loading ? 1 : progress) * 100, 100)}%`,
    }
    return (
        <div className="row g-3 align-items-baseline">
            <div className="col">
                <div className="progress">
                    <div className={classNames("progress-bar", {'progress-bar-striped': loading, 'progress-bar-animated': loading})}
                         style={style} title={calcTime(duration * progress)}>
                        <span className="visually-hidden">{calcTime(duration * progress)}</span>
                    </div>
                </div>
            </div>
            <div className="col-auto">
                {calcTime(duration * progress)}
            </div>
        </div>
    )
}

export default NowPlayingProgress;
