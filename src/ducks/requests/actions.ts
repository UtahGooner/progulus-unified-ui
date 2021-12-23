import {SearchResult} from "../../types";
import {RequestAction, RequestThunkAction} from "./types";
import {
    requestFetchFiltersFailed,
    requestFetchFiltersRequested,
    requestFetchFiltersSucceeded,
    requestFilterSetCountry,
    requestFilterSetGenre,
    requestFilterSetRated,
    requestFilterSetRating,
    requestFilterSetSearch,
    requestFilterSetYear,
    requestFilterToggleAlbums,
    requestFilterToggleArtists,
    requestFilterToggleSongs, requestsAlbumsSearchFailed, requestsAlbumsSearchRequested, requestsAlbumsSearchSucceeded,
    requestsArtistsSearchFailed,
    requestsArtistsSearchRequested,
    requestsArtistsSearchSucceeded,
    requestSelectSong, requestSetPage
} from "./actionTypes";
import {selectAlbumsLoading, selectArtistsLoading, selectFilter, selectFiltersLoading} from "./selectors";
import {fetchJSON} from "../../utils/fetch";


export const setPageAction = (page:string):RequestAction => ({type: requestSetPage, payload: {value: page}});
export const selectSongAction = (song: SearchResult): RequestAction => ({type: requestSelectSong, payload: {song}});

export const searchChangedAction = (search: string): RequestAction => ({
    type: requestFilterSetSearch,
    payload: {search}
});

export const toggleArtistsAction = (): RequestAction => ({type: requestFilterToggleArtists});
export const toggleAlbumsAction = (): RequestAction => ({type: requestFilterToggleAlbums});
export const toggleSongsAction = (): RequestAction => ({type: requestFilterToggleSongs});

export const selectGenreAction = (genre: string) => ({type: requestFilterSetGenre, payload: {value: genre}});
export const selectYearAction = (year: string) => ({type: requestFilterSetYear, payload: {value: year}});
export const selectCountryAction = (country: string) => ({type: requestFilterSetCountry, payload: {value: country}});
export const selectRatingAction = (rating: number | null) => ({type: requestFilterSetRating, payload: {rate: rating}});
export const selectRatedAction = (rated: number | null) => ({type: requestFilterSetRated, payload: {rate: rated}});

export const fetchSearchFiltersAction = (): RequestThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectFiltersLoading(state)) {
                return;
            }
            const url = `/api/search/autocomplete.php`;
            const filters = await fetchJSON(url, {credentials: 'same-origin'});
            dispatch({type: requestFetchFiltersSucceeded, payload: {filters}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchSearchFiltersAction()", error.message);
                return dispatch({type: requestFetchFiltersFailed, error, meta: requestFetchFiltersRequested})
            }
            console.error("fetchSearchFiltersAction()", error);
        }
    }

export const fetchSearchResultsAction = ():RequestThunkAction =>
    async (dispatch, getState) => {
        try {
            await dispatch(fetchSearchArtistsAction());
        } catch(error:unknown) {
            if (error instanceof Error) {
                console.log("fetchSearchResults()", error.message);
            }
            console.error("fetchSearchResults()", error);
        }
    }

export const fetchSearchArtistsAction = (): RequestThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectArtistsLoading(state)) {
                return;
            }
            dispatch({type: requestsArtistsSearchRequested});
            const params = buildSearchParams(selectFilter(state));
            params.set('for', 'artists');
            const url = '/api/search/?' + params.toString();
            const response = await fetchJSON(url);
            dispatch({type: requestsArtistsSearchSucceeded, payload: {list: response.artists || []}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchSearchArtists()", error.message);
                return dispatch({type: requestsArtistsSearchFailed, error, meta: requestsArtistsSearchRequested});
            }
            console.error("fetchSearchArtists()", error);
        }
    }

export const fetchSearchAlbumsAction = (artist?:string): RequestThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectAlbumsLoading(state)) {
                return;
            }
            dispatch({type: requestsAlbumsSearchRequested});
            let params = new URLSearchParams();
            if (artist) {
                params.set('artist', artist);
            } else {
                params = buildSearchParams(selectFilter(state));
            }

            params.set('for', 'albums');
            const url = '/api/search/?' + params.toString();
            const response = await fetchJSON(url);
            dispatch({type: requestsAlbumsSearchSucceeded, payload: {list: response.albums || []}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchSearchArtists()", error.message);
                return dispatch({type: requestsAlbumsSearchFailed, error, meta: requestsAlbumsSearchRequested});
            }
            console.error("fetchSearchArtists()", error);
        }
    }

interface BuildSearchProps {
    artist: string,
    album: string,
    song: string,
    genre: string,
    rated: number | null,
    rating: number | null,
    year: string,
    country: string,
    search: string,
}

function buildSearchParams({
                               artist,
                               album,
                               song,
                               genre,
                               rated,
                               rating,
                               year,
                               country,
                               search
                           }: BuildSearchProps): URLSearchParams {
    const params = new URLSearchParams();
    if (artist) {
        params.set('artist', artist);
    }
    if (album) {
        params.set('album', album);
    }
    if (song) {
        params.set('album', song);
    }
    if (genre) {
        params.set('genre', genre);
    }
    if (rated !== null) {
        params.set('rated', String(rated));
    }
    if (rating !== null) {
        params.set('rating', String(rating));
    }
    if (year) {
        params.set('year', year);
    }
    if (country) {
        params.set('country', country);
    }
    if (search) {
        params.set('search', search);
    }
    return params;
}
