import {CurrentSong} from "../../types";
import {RootState} from "../../app/configureStore";
import {getStore, setStore, store_historyLimit} from "../../utils/browserStore";
import {createAction, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchCurrent} from "../../api/songs";

export interface PlayingState {
    current: CurrentSong | null,
    history: CurrentSong[],
    queue: CurrentSong[],
    loading: boolean,
    count: number
}

const defaultState: PlayingState = {
    current: null,
    queue: [],
    history: [],
    loading: false,
    count: getStore(store_historyLimit) ?? 10,
}

export const historyCountChanged = 'playing/historyCountChanged';
export const loadCurrentPrefix = 'playing/loadCurrent';

export const historyCountChangedAction = createAction<number>(historyCountChanged);
export const loadCurrentAction = createAsyncThunk(
    loadCurrentPrefix,
    async (arg: void, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;

            const {songs, userId, queue} = await fetchCurrent(selectHistoryCount(state));
            return {songs, userId, queue}
        } catch (err: unknown) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue({error: err.message, context: loadCurrentPrefix});
            }
            return thunkAPI.rejectWithValue({error: 'Unknown error in fetchCurrent()', context: loadCurrentPrefix});
        }
    })


export const selectCurrentSong = (state: RootState): CurrentSong | null => state.playing.current;
export const selectQueue = (state: RootState) => state.playing.queue;
export const selectHistory = (state: RootState) => state.playing.history;
export const selectLoading = (state: RootState) => state.playing.loading;
export const selectHistoryCount = (state: RootState) => state.playing.count;
export const selectListenerCount = (state: RootState) => state.playing.current?.listeners || 0;

const historySort = (a: CurrentSong, b: CurrentSong) => b.dateLastPlayed - a.dateLastPlayed;

const reducer = createReducer(defaultState, (builder) => {
    builder
        .addCase(historyCountChangedAction, (state, action) => {
            setStore(store_historyLimit, action.payload);
            state.count = action.payload;
        })
        .addCase(loadCurrentAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadCurrentAction.fulfilled, (state, action) => {
            const [current, ...history] = action.payload.songs;
            state.loading = false;
            state.queue = action.payload.queue ?? [];
            state.current = current ?? null;
            state.history = history.sort(historySort);
        })
        .addCase(loadCurrentAction.rejected, (state) => {
            state.loading = false;
        })
})

export default reducer;
