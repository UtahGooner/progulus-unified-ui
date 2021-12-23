import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, selectFilterSearch} from "./selectors";
import {
    fetchSearchResultsAction,
    searchChangedAction,
    toggleAlbumsAction,
    toggleArtistsAction,
    toggleSongsAction
} from "./actions";
import FilterToggleButton from "./FilterToggleButton";
import GenreSelect from "./GenreSelect";
import YearSelect from "./YearSelect";
import CountrySelect from "./CountrySelect";
import RatingInput from "./RatingInput";
import RatedInput from "./RatedInput";

const RequestSearchFilter: React.FC = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(selectFilterSearch);
    const filter = useSelector(selectFilter);
    const {artists, albums, songs} = filter;
    const [showAdvanced, setShowAdvanced] = useState(false);

    const searchChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchChangedAction(ev.target.value));
    }
    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(fetchSearchResultsAction());
    }


    return (
        <form onSubmit={submitHandler} id="progulus--search-form">
            <div className="input-group">
                <FilterToggleButton className="bi-person-circle" text="Artist" checked={artists}
                                    onClick={() => dispatch(toggleArtistsAction())}/>
                <FilterToggleButton className="bi-disc-fill" text="Albums" checked={albums}
                                    onClick={() => dispatch(toggleAlbumsAction())}/>
                <FilterToggleButton className="bi-music-note-beamed" text="Songs" checked={songs}
                                    onClick={() => dispatch(toggleSongsAction())}/>
                <input type="text" className="form-control" value={searchValue} onChange={searchChangeHandler}/>
                <button type="submit" className="btn btn-primary">
                    <span className="bi-search" aria-controls="progulus--search-form" aria-label="Submit"/>
                </button>
                <FilterToggleButton className="bi-gear-wide-connected d-none d-md-block" text="Advanced Search"
                                    checked={showAdvanced} onClick={() => setShowAdvanced(!showAdvanced)} />
            </div>
            {showAdvanced && (
                <div className="mt-1">
                    <div className="row gy-1 gx-3">
                        <div className="col-6 col-md-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text"><span className="bi-star-fill" /></div>
                                <RatingInput />
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text"><span className="bi-star" /></div>
                                <RatedInput />
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text">Year</div>
                                <YearSelect />
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text">Country</div>
                                <CountrySelect />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Genre:</span>
                                <GenreSelect />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </form>
    )
}

export default RequestSearchFilter;
