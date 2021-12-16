import React from 'react';
import {useSelector} from "react-redux";
import {selectHistory} from "./index";
import RecentSong from "./RecentSong";
import HistoryCount from "./HistoryCount";

const RecentSongs: React.FC = () => {
    const recent = useSelector(selectHistory);

    return (
        <div className="np--recent-songs mt-5">
            <div className="row gy-3">
                <div className="col">
                    <h4>Recent Songs</h4>
                </div>
                <div className="col-auto">
                    <HistoryCount/>
                </div>
            </div>
            <div className="np--recent-song-list">
                {recent.map(song => (
                    <RecentSong key={song.id} song={song}/>
                ))}
            </div>
        </div>
    )
}

export default RecentSongs;
