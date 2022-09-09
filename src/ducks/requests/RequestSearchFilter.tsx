import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {loadAlbums, loadArtists, loadSongs, selectFilterSearch, selectSearchParams, setSearch} from "./index";
import FilterToggleButton from "./FilterToggleButton";
import GenreSelect from "./GenreSelect";
import YearFilter from "./YearFilter";
import CountrySelect from "./CountrySelect";
import RatingInput from "./RatingInput";
import RatedInput from "./RatedInput";
import {useAppDispatch} from "../../app/configureStore";

const RequestSearchFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const searchValue = useSelector(selectFilterSearch);
    const filter = useSelector(selectFilterSearch);
    const searchParams = useSelector(selectSearchParams);
    const [searchArtists, setSearchArtists] = useState(true);
    const [searchAlbums, setSearchAlbums] = useState(true);
    const [searchSongs, setSearchSongs] = useState(true);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const searchChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(ev.target.value));
    }
    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        const followSingleResult = [searchArtists, searchAlbums, searchSongs].filter(val => val).length === 1;
        if (searchArtists) {
            dispatch(loadArtists({...searchParams, followSingleResult}))
        }
        if (searchAlbums) {
            dispatch(loadAlbums({...searchParams, followSingleResult}))
        }
        if (searchSongs) {
            dispatch(loadSongs({...searchParams}))
        }
    }


    return (
        <form onSubmit={submitHandler} id="progulus--search-form">
            <div className="input-group">
                <FilterToggleButton className="bi-person-circle" text="Artist" checked={searchArtists}
                                    onClick={() => setSearchArtists(!searchArtists)}/>
                <FilterToggleButton className="bi-disc-fill" text="Albums" checked={searchAlbums}
                                    onClick={() => setSearchAlbums(!searchAlbums)}/>
                <FilterToggleButton className="bi-music-note-beamed" text="Songs" checked={searchSongs}
                                    onClick={() => setSearchSongs(!searchSongs)}/>
                <input type="text" className="form-control" value={searchValue} onChange={searchChangeHandler}/>
                <button type="submit" className="btn btn-primary">
                    <span className="bi-search" aria-controls="progulus--search-form" aria-label="Submit"/>
                </button>
                <FilterToggleButton className="bi-gear-wide-connected d-none d-md-block" text="Advanced Search"
                                    checked={showAdvanced} onClick={() => setShowAdvanced(!showAdvanced)}/>
            </div>
            {showAdvanced && (
                <div className="mt-1">
                    <div className="row gy-1 gx-3">
                        <div className="col-6 col-md-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text"><span className="bi-star-fill"/></div>
                                <RatingInput/>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text"><span className="bi-star"/></div>
                                <RatedInput/>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text">Year</div>
                                <YearFilter/>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text">Country</div>
                                <CountrySelect/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Genre:</span>
                                <GenreSelect/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </form>
    )
}

export default RequestSearchFilter;
