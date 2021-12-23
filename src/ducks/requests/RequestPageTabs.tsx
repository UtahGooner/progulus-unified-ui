import React from "react";
import {useSelector} from "react-redux";
import {
    selectAlbumsCount,
    selectAlbumsLoading,
    selectArtistsCount, selectArtistsLoading,
    selectSongsCount,
    selectSongsLoading
} from "./selectors";
import {NavLink} from "react-router-dom";
import {AlbumIcon, ArtistIcon, SongIcon} from "../../components/Icons";
import LoadingSpinner from "./LoadingSpinner";

const RequestPageTabs:React.FC = () => {
    const artists = useSelector(selectArtistsCount);
    const albums = useSelector(selectAlbumsCount);
    const songs = useSelector(selectSongsCount);

    const artistsLoading = useSelector(selectArtistsLoading);
    const albumsLoading = useSelector(selectAlbumsLoading);
    const songsLoading = useSelector(selectSongsLoading);

    return (
        <ul className="nav nav-tabs nav-fill mt-3 mb-1">
            <li className="nav-item">
                <NavLink to="/request/artists" className="nav-link">
                    <ArtistIcon />
                    <span className="d-none d-md-inline ms-3">
                            Artists
                        </span>
                    <LoadingSpinner loading={artistsLoading} text="Loading artists" />
                    {!!artists && !artistsLoading && (<span className="ms-1">({artists})</span>)}
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/request/albums" className="nav-link">
                    <AlbumIcon />
                    <span className="d-none d-md-inline ms-3">
                            Albums
                        </span>
                    <LoadingSpinner loading={albumsLoading} text="Loading albums" />
                    {!!albums && !albumsLoading && (<span className="ms-1">({albums})</span>)}
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/request/songs" className="nav-link">
                    <SongIcon />
                    <span className="d-none d-md-inline ms-3">Songs</span>
                    <LoadingSpinner loading={songsLoading} text="Loading songs" />
                    {!!songs && !songsLoading && (<span className="ms-1">({songs})</span>)}
                </NavLink>
            </li>
        </ul>
    )
}

export default RequestPageTabs;
