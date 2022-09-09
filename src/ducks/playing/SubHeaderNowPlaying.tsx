import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {loadCurrentAction, selectCurrentSong, selectLoading} from "./index";
import './now-playing.scss';
import ArtistLink from "../../components/ArtistLink";
import {useAppDispatch} from "../../app/configureStore";

const SubHeaderNowPlaying: React.FC = () => {
    let timerHandle: number;
    const dispatch = useAppDispatch();
    const currentSong = useSelector(selectCurrentSong);
    const loading = useSelector(selectLoading);

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

    if (!currentSong && loading) {
        return (<>Loading current song and history...</>);
    } else if (!currentSong) {
        return null;
    }

    return (
        <>
            <strong>{currentSong.title}</strong> by <ArtistLink artist={currentSong.artist}/>
        </>
    )
}

export default SubHeaderNowPlaying;
