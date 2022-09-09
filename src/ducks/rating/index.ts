import {combineReducers} from "redux";
import {SaveRatingProps, SongRating, SongRatingList} from "../../types";
import {RatingAction} from "./types";
// import {loadCurrentSucceeded} from "../playing";
import {RootState} from "../../app/configureStore";
import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import Debug from 'debug';
import {selectUserId} from "../user";
import {fetchRating, postRating} from "../../api/songs";
import {loadCurrentAction} from "../playing";

const debug = Debug('progulus:ducks:rating');
export const loadRatingPrefix = 'rating/load';
export const saveRatingPrefix = 'rating/save';


export interface RatingState {
    list: SongRatingList,
}

const defaultState: RatingState = {
    list: {},
}

const saveRating = createAsyncThunk(
    saveRatingPrefix,
    async (arg: SaveRatingProps, thunkAPI): Promise<SongRating | null> => {
        try {
            const state = thunkAPI.getState() as RootState;
            const userId = selectUserId(state);
            if (userId === 1) {
                return null
            }
            return await postRating(arg)
        } catch (err: unknown) {
            if (err instanceof Error) {
                thunkAPI.rejectWithValue({error: err, context: saveRatingPrefix});
                return null;
            }
            debug("saveRating()", err);
            return null;
        }
    }
)

const loadRating = createAsyncThunk(
    loadRatingPrefix,
    async (arg: number, thunkAPI): Promise<SongRating | null> => {
        try {
            return await fetchRating(arg);
        } catch (err: unknown) {
            if (err instanceof Error) {
                debug("loadRating()", err.message);
                return Promise.reject(err);
            }
            debug("loadRating()", err);
            return Promise.reject(new Error('Error in loadRating()'));
        }
    }
)

const ratingReducer = createReducer(defaultState, (builder) => {
    builder
        .addCase(loadRating.pending, (state, action) => {
            const id = action.meta.arg;
            if (state.list[id]) {
                state.list[id].loading = true;
            }
        })
        .addCase(loadRating.fulfilled, (state, action) => {
            const id = action.meta.arg;
            if (state.list[id]) {
                state.list[id].loading = false;
                if (action.payload) {
                    state.list[id].rating = action.payload
                }
            }
        })
        .addCase(loadRating.rejected, (state, action) => {
            const id = action.meta.arg;
            if (state.list[id]) {
                state.list[id].loading = false;
            }
        })
        .addCase(saveRating.pending, (state, action) => {
            const id = action.meta.arg.songID;
            if (state.list[id]) {
                state.list[id].saving = true;
            }
        })
        .addCase(saveRating.fulfilled, (state, action) => {
            const id = action.meta.arg.songID;
            if (state.list[id]) {
                state.list[id].saving = false;
                if (action.payload) {
                    state.list[id].rating = action.payload
                }
            }
        })
        .addCase(saveRating.rejected, (state, action) => {
            const id = action.meta.arg.songID;
            if (state.list[id]) {
                state.list[id].saving = false;
            }
        })
        .addCase(loadCurrentAction.fulfilled, (state, action) => {
            const songIDs:number[] = action.payload.songs.map(s => s.id);

            Object.keys(state.list).map(id => Number(id))
                .forEach(id => {
                    if (!songIDs.includes(id)) {
                        delete state.list[id];
                    }
                })

            action.payload.songs.forEach(song => {
                const {id, userRating, rating, votes} = song;
                if (!state.list[id]) {

                }
            })
        })

})

export const selectSongRating = (id: number) => (state: RootState) => state.rating.list[id] ?? 0;
export const selectUserSongRating = (id: number) => (state: RootState) => state.rating.list[id]?.rating?.userRating || 0;

const listReducer = (state: SongRatingList = defaultState.list, action: RatingAction): SongRatingList => {
    const {type, payload} = action;
    switch (type) {
    case saveRatingSucceeded:
    case loadRatingSucceeded:
        if (payload?.rating && payload.rating.songID) {
            return {
                ...state,
                [payload.rating.songID]: payload.rating,
            }
        }
        return state;
        // case loadCurrentSucceeded:
        //     console.log(action.payload?.songs);
        //     if (action.payload?.songs) {
        //         const newState = {...state};
        //         action.payload.songs.forEach(({id, userRating, votes, rating}) => {
        //             const currentRating:SongRating = newState[id] || {rating: {rating, votes, userRating}, songID: id, ratings: [{rating, votes}]};
        //             if (currentRating.songID) {
        //                 currentRating.rating = {rating, votes, userRating};
        //             }
        //             newState[id] = currentRating;
        //         });
        //         return {...newState};
        //     }
        //     return state;
    default:
        return state;
    }
}

const loadingReducer = (state: boolean = defaultState.loading, action: RatingAction): boolean => {
    switch (action.type) {
    case loadRatingRequested:
        return true;
    case loadRatingFailed:
    case loadRatingSucceeded:
        return false;
    default:
        return state;
    }
}

export default combineReducers({
    list: listReducer,
    loading: loadingReducer,
});
