import {PlayingThunkAction} from "./types";
import {
    historyCountChanged,
    loadCurrentFailed,
    loadCurrentRequested,
    loadCurrentSucceeded, selectHistoryCount,
    selectLoading
} from "./index";
import {fetchJSON} from "../../utils/fetch";
import {CurrentSong} from "../../types";
import {setStore, store_historyLimit} from "../../utils/browserStore";
import {selectAlert} from "../alerts";

const pathLoadCurrent = '/api/playing/';
let tryOnErrorTimer:number = 0;

export const historyCountChangedAction = (count: number) => {
    setStore(store_historyLimit, count);
    return ({type: historyCountChanged, payload: {count}});
}

export const loadCurrentAction = ():PlayingThunkAction =>
    async (dispatch, getState) => {
    try {
        window.clearTimeout(tryOnErrorTimer);

        const state = getState();
        if (selectLoading(state)) {
            return;
        }
        if (selectAlert(loadCurrentFailed)(state)) {
            console.error('previous error occurred on load, waiting...');
            //try again in 10 minutes
            tryOnErrorTimer = window.setTimeout(() => {
                dispatch(loadCurrentAction());
            }, 10 * 60 * 1000);
            return;
        }
        const count = selectHistoryCount(state);
        const url = pathLoadCurrent + `?limit=${encodeURIComponent(count + 1)}`;

        dispatch({type: loadCurrentRequested});
        const {debug, songs, queue, error} = await fetchJSON(url, {cache: 'no-cache'});
        if (error) {
            window.setTimeout(() => {
                dispatch(loadCurrentAction());
            }, 10 * 60 * 1000);
            return;
        }
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
