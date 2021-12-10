import {combineReducers} from "redux";
import {PlayingAction, PlayingState} from "./types";
import {BasicSong, CurrentSong} from "../../types";
import {RootState} from "../index";


export const loadCurrentRequested = 'playing/loadCurrentRequested';
export const loadCurrentSucceeded = 'playing/loadCurrentSucceeded';
export const loadCurrentFailed = 'playing/loadCurrentFailed';

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

const queueReducer = (state:BasicSong[] = defaultState.queue, action:PlayingAction):BasicSong[] => {
    const {type, payload} = action;
    switch (type) {
    case loadCurrentSucceeded:
        return payload?.queue || [];
    default: return state;
    }
}

const historyReducer = (state:BasicSong[] = defaultState.history, action:PlayingAction):BasicSong[] => {
    const {type, payload} = action;
    switch (type) {
    case loadCurrentSucceeded:
        if (payload?.songs) {
            const [current, ...history] = payload.songs;
            return history;
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

export default combineReducers({
    current: currentReducer,
    queue: queueReducer,
    history: historyReducer,
    loading: loadingReducer
})
