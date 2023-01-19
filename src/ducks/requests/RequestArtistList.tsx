import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectArtistsList} from "./index";
import RequestArtist from "./RequestArtist";
import classNames from "classnames";

const RequestArtistList: React.FC = () => {
    const [displayMode, setDisplayMode] = useState<string>('grid');

    const artistList = useSelector(selectArtistsList);

    return (
        <div>
            <h3 className="visually-hidden">Artists</h3>
            <div>
                <div className="form-check form-check-inline">
                    <input type="radio" checked={displayMode === 'grid'} className="form-check-input" onClick={()=>setDisplayMode('grid')} />
                    <label onClick={() => setDisplayMode('grid')} className="form-check-label">Grid</label>
                </div>
                <div className="form-check form-check-inline">
                    <input type="radio" checked={displayMode === 'list'} className="form-check-input" onClick={()=>setDisplayMode('list')} />
                    <label onClick={() => setDisplayMode('list')} className="form-check-label">List</label>
                </div>
            </div>
            <div className={classNames("progulus--request-artist-list", `display--${displayMode}`)}>
                {artistList.map(row => {
                    return (
                        <RequestArtist key={row.artist} data={row}/>
                    )
                })}
            </div>
        </div>
    )
}

export default RequestArtistList;
