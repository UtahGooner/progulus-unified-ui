import {combineReducers} from "redux";
import {PlayingAction, PlayingState} from "./types";
import {BasicSong, CurrentSong} from "../../types";
import {RootState} from "../index";
import {getStore, store_historyLimit} from "../../utils/browserStore";


export const loadCurrentRequested = 'playing/loadCurrentRequested';
export const loadCurrentSucceeded = 'playing/loadCurrentSucceeded';
export const loadCurrentFailed = 'playing/loadCurrentFailed';

export const historyCountChanged = 'playing/historyCountChanged';

const defaultState:PlayingState = {
    current: null,
    queue: [],
    history: [],
    loading: false,
}

export const selectCurrentSong = (state:RootState):CurrentSong|null => state.playing.current;
export const selectQueue = (state:RootState) => state.playing.queue;
export const selectHistory = (state:RootState) => state.playing.history;
export const selectLoading = (state:RootState) => state.playing.loading;
export const selectHistoryCount = (state:RootState) => state.playing.historyCount;
export const selectListenerCount = (state:RootState) => state.playing.current?.listeners || 0;

const historySort = (a:CurrentSong, b:CurrentSong) => b.dateLastPlayed - a.dateLastPlayed;

const currentReducer = (state:CurrentSong|null = defaultState.current, action:PlayingAction):CurrentSong|null => {
    const {type, payload} = action;
    switch (type) {
    case loadCurrentSucceeded:
        if (payload?.songs && payload.songs.length > 0) {
            return {...payload.songs[0]};
        }
        return state;
    default:return state;
    }
}

const queueReducer = (state:CurrentSong[] = defaultState.queue, action:PlayingAction):CurrentSong[] => {
    const {type, payload} = action;
    switch (type) {
    case loadCurrentSucceeded:
        return payload?.queue || [];
    default: return state;
    }
}

const historyReducer = (state:CurrentSong[] = defaultState.history, action:PlayingAction):CurrentSong[] => {
    const {type, payload} = action;
    switch (type) {
    case loadCurrentSucceeded:
        if (payload?.songs && payload.songs.length > 1) {
            const [current, ...history] = payload.songs;
            return history.sort(historySort);
        }
        return state;
    default: return state;
    }
}

const loadingReducer = (state:boolean = defaultState.loading, action:PlayingAction):boolean => {
    switch (action.type) {
    case loadCurrentRequested:
        return true;
    case loadCurrentSucceeded:
    case loadCurrentFailed:
        return false;
    default: return state;
    }
}

const defaultHistoryCount = getStore(store_historyLimit) ?? 10;

const historyCountReducer = (state:number = defaultHistoryCount, action:PlayingAction):number => {
    const {type, payload} = action;
    switch (type) {
    case historyCountChanged:
        return payload?.count || 10;
    default: return state;
    }
}

export default combineReducers({
    current: currentReducer,
    queue: queueReducer,
    history: historyReducer,
    loading: loadingReducer,
    historyCount: historyCountReducer,
})
