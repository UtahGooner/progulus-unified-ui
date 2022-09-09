import {
    SearchDefaultsResponse,
    CurrentSong,
    SearchProps,
    SearchResponse,
    SearchResult,
    SongRating,
    SaveRatingProps
} from "../types";
import {fetchJSON} from "../utils/fetch";

const debug = console.debug;
const pathLoadCurrent = '/api/playing/';
const rateURL = '/api/rating/rate.php';
const ratingURL = (songID: number) => `/api/rating/rating.php?songID=${encodeURIComponent(songID)}`;

export async function fetchCurrent(count: number): Promise<{ userId: string, songs: CurrentSong[], queue: CurrentSong[] }> {
    try {
        const query = new URLSearchParams();
        query.set('count', (count + 1).toString());
        const url = `${pathLoadCurrent}?${query.toString()}`
        const {
            user,
            songs,
            queue
        } = await fetchJSON<{ user: string, songs: CurrentSong[], queue: CurrentSong[] }>(url, {cache: 'no-cache'});

        const ts = new Date().valueOf();
        songs.forEach((song: CurrentSong) => {
            song.offset = ts - song.now * 1000;
        })

        return {userId: user, songs, queue};
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("fetchCurrent()", err.message);
            return Promise.reject(err);
        }
        debug("fetchCurrent()", err);
        return Promise.reject(new Error('Error in fetchCurrent()'));
    }
}

function buildSearchParams(search: Partial<SearchProps>): URLSearchParams {

    const params = new URLSearchParams();
    if (search.artist) {
        params.set('artist', search.artist);
    }
    if (search.album) {
        params.set('album', search.album);
    }
    if (search.song) {
        params.set('album', search.song);
    }
    if (search.genre) {
        params.set('genre', search.genre);
    }
    if (search.rated !== null) {
        params.set('rated', String(search.rated ?? 0));
    }
    if (search.rating !== null) {
        params.set('rating', String(search.rating ?? 0));
    }
    if (search.year) {
        params.set('year', search.year);
    }
    if (search.country) {
        params.set('country', search.country);
    }
    if (search.search) {
        params.set('search', search.search);
    }
    return params;
}


export const fetchSearch = async (search: SearchProps): Promise<SearchResult[]> => {
    try {
        const searchFor = search.for;
        const params = buildSearchParams(search);
        params.set('for', searchFor);
        const url = '/api/search/?' + params.toString();
        const response = await fetchJSON<SearchResponse>(url);
        return response[searchFor] || [];
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Promise.reject(error);
        }
        return Promise.reject(new Error('fetchSearch(): Unknown error'));
    }
}

export const fetchSearchDefaults = async ():Promise<SearchDefaultsResponse> => {
    try {
        const url = '/api/search/autocomplete.php';
        return await fetchJSON<SearchDefaultsResponse>(url);
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("fetchSearchAutocomplete()", err.message);
            return Promise.reject(err);
        }
        debug("fetchSearchAutocomplete()", err);
        return Promise.reject(new Error('Error in fetchSearchAutocomplete()'));
    }
}

export const fetchRating = async (songID: number):Promise<SongRating> => {
    try {
        return await fetchJSON(ratingURL(songID));
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("loadRating()", err.message);
            return Promise.reject(err);
        }
        debug("loadRating()", err);
        return Promise.reject(new Error('Error in loadRating()'));
    }
}
export const postRating = async (rating: SaveRatingProps):Promise<SongRating> => {
    try {
        const body = {...rating};
        return await fetchJSON(rateURL, {method: 'POST'}, body);
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("postRating()", err.message);
            return Promise.reject(err);
        }
        debug("postRating()", err);
        return Promise.reject(new Error('Error in postRating()'));
    }
}
