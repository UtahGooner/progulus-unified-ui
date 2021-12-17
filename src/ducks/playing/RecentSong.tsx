import React, {useState} from "react";
import {CurrentSong} from "../../types";
import AlbumCover from "../../components/AlbumCover";
import SongInfo from "../../components/SongInfo";
import classNames from "classnames";

export interface RecentSongProps {
    song:CurrentSong
}

const RecentSong:React.FC<RecentSongProps> = ({song}) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className={classNames("np--recent-song", {selected: showInfo})}>
            <div className="np--recent-song-artwork">
                <AlbumCover artist={song.artist} album={song.album} albumYear={song.albumYear} picture={song.picture}
                            loading="lazy" onClick={() => setShowInfo(!showInfo)}/>
            </div>
            <div className={classNames("np--recent-song-info", {'hidden': !showInfo})}>
                <SongInfo song={song} />
            </div>
        </div>
    )
}

export default RecentSong;
