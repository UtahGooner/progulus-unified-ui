import {RequestThunkAction} from "./types";
import {
    requestsAlbumsSearchFailed,
    requestsAlbumsSearchRequested,
    requestsArtistsSearchFailed,
    requestsArtistsSearchRequested
} from "./actionTypes";


export const fetchSearchArtistsAction = (): RequestThunkAction =>
    async (dispatch, getState) => {
        try {
            // const state = getState();
            // if (selectArtistsLoading(state)) {
            //     return;
            // }
            // dispatch({type: requestsArtistsSearchRequested});
            // const params = buildSearchParams(selectFilter(state));
            // params.set('for', 'artists');
            // const url = '/api/search/?' + params.toString();
            // const response = await fetchJSON(url);
            // dispatch({type: requestsArtistsSearchSucceeded, payload: {list: response.artists || []}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchSearchArtists()", error.message);
                return dispatch({type: requestsArtistsSearchFailed, error, meta: requestsArtistsSearchRequested});
            }
            console.error("fetchSearchArtists()", error);
        }
    }

export const fetchSearchAlbumsAction = (artist?: string): RequestThunkAction =>
    async (dispatch, getState) => {
        try {
            // const state = getState();
            // if (selectAlbumsLoading(state)) {
            //     return;
            // }
            // dispatch({type: requestsAlbumsSearchRequested});
            // let params = new URLSearchParams();
            // if (artist) {
            //     params.set('artist', artist);
            // } else {
            //     params = buildSearchParams(selectFilter(state));
            // }
            //
            // params.set('for', 'albums');
            // const url = '/api/search/?' + params.toString();
            // const response = await fetchJSON(url);
            // dispatch({type: requestsAlbumsSearchSucceeded, payload: {list: response.albums || []}});
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
