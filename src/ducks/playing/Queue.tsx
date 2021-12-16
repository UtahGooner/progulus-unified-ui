import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectQueue} from "./index";
import {loadCurrentAction} from "./actions";
import Duration from "../../components/Duration";
import "./now-playing.scss";
import ArtistLink from "../../components/ArtistLink";
import AlbumCover from "../../components/AlbumCover";
import QueuedArtist from "./QueuedArtist";




const Queue:React.FC = () => {
    const dispatch = useDispatch();
    const queue = useSelector(selectQueue);
    const [nextPicture] = queue.map(song => song.picture);

    useEffect(() => {
        if (nextPicture) {
            const img = new Image();
            img.src = `https://progulus.com/pictures/${encodeURIComponent(nextPicture)}`;
        }
    }, [nextPicture])

    const clickHandler = () => {
        dispatch(loadCurrentAction());
    }

    const duration = queue.reduce((d, cv) => d + cv.duration , 0);

    return (
        <div className="progulus--queue d-block d-flex-md">
            <div className="progulus--queue-title">
                <h3 onClick={clickHandler} className="me-3">Coming up:</h3>
                <h3 onClick={clickHandler} className="me-3">
                    <Duration duration={duration} />
                </h3>
            </div>
            <div className="progulus--queue-list">
                {queue
                    // .filter((song, index) => !queue[index - 1] || (song.artist !== queue[index - 1].artist) )
                    .map((song, index) => (
                        <QueuedArtist key={song.id} artist={song.artist} requester={song.requester}
                                      prevArtist={queue[index - 1] ? queue[index - 1].artist : undefined}
                                      nextArtist={queue[index + 1] ? queue[index + 1].artist : undefined} />
                    ))}
            </div>
        </div>
    )
}
export default Queue;
