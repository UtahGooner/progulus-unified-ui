import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilterGenre, selectGenresList} from "./index";
import {setCurrentGenre} from "./index";

const GenreSelect:React.FC = () => {
    const dispatch = useDispatch();
    const genre = useSelector(selectFilterGenre);
    const genreList = useSelector(selectGenresList);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCurrentGenre(ev.target.value));
    }
    return (
        <select className="form-select form-select-sm" value={genre} onChange={changeHandler}>
            <option value="">All Genres</option>
            {genreList.map((genre, index) => <option key={index} value={genre} >{genre}</option>)}
        </select>
    )
}

export default GenreSelect;
