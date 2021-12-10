import {PlayingThunkAction} from "./types";
import {loadCurrentFailed, loadCurrentRequested, loadCurrentSucceeded} from "./index";
import {fetchJSON} from "../../utils/fetch";
import {CurrentSong} from "../../types";

const pathLoadCurrent = '/api/playing/';

export const loadCurrentAction = ():PlayingThunkAction =>
    async (dispatch, getState) => {
    try {
        dispatch({type: loadCurrentRequested});
        const {debug, songs, queue} = await fetchJSON(pathLoadCurrent, {cache: 'no-cache'});
        if (debug) {
            console.log(debug);
        }
        const ts = new Date().valueOf();
        songs.forEach((song:CurrentSong) => {
            song.offset = ts - song.now * 1000;
        })
        dispatch({type: loadCurrentSucceeded, payload: {songs, queue}});
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.log("loadCurrentAction()", err.message);
        }
        dispatch({type: loadCurrentFailed, error: err instanceof Error ? err : undefined});
    }
}

// export const saveRating = (songID:number, rating: number)
