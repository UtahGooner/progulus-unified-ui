import {combineReducers} from "redux";
import {SongRating, SongRatingList} from "../../types";
import {RatingAction, RatingState} from "./types";
import {loadCurrentSucceeded} from "../playing";
import {PlayingAction} from "../playing/types";
import {RootState} from "../index";


export const loadRatingRequested = 'rating/loadRequested';
export const loadRatingSucceeded = 'rating/loadSucceeded';
export const loadRatingFailed = 'rating/loadFailed';
export const saveRatingRequested = 'rating/saveRequested';
export const saveRatingSucceeded = 'rating/saveSucceeded';
export const saveRatingFailed = 'rating/saveFailed';

const defaultState:RatingState = {
    list: {},
    loading: false,
    saving: false
}

export const selectSongRating = (id:number) => (state:RootState) => state.rating.list[id];
export const selectUserSongRating = (id:number) => (state:RootState) => state.rating.list[id]?.rating?.userRating || 0;

const listReducer = (state:SongRatingList = defaultState.list, action:RatingAction):SongRatingList => {
    const {type, payload} = action;
    switch (type) {
    case loadRatingSucceeded:
        if (payload?.rating && payload.rating.songID) {
            return {
                ...state,
                [payload.rating.songID]: payload.rating,
            }
        }
        return state;
    case loadCurrentSucceeded:
        console.log(action.payload?.songs);
        if (action.payload?.songs) {
            const newState = {...state};
            action.payload.songs.forEach(({id, userRating, votes, rating}) => {
                const currentRating:SongRating = newState[id] || {rating: {rating, votes, userRating}, songID: id, ratings: [{rating, votes}]};
                if (currentRating.songID) {
                    currentRating.rating = {rating, votes, userRating};
                }
                newState[id] = currentRating;
            });
            return {...newState};
        }
        return state;
    default: return state;
    }
}

const loadingReducer = (state:boolean = defaultState.loading, action:RatingAction):boolean => {
    switch (action.type) {
    case loadRatingRequested:
        return true;
    case loadRatingFailed:
    case loadRatingSucceeded:
        return false;
    default: return state;
    }
}

export default combineReducers({
    list: listReducer,
    loading: loadingReducer,
});
