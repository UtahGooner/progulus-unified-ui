import {BasicSong, CurrentSong, StandardAction} from "../../types";
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";


export interface PlayingState {
    current: CurrentSong | null,
    history: BasicSong[],
    queue: BasicSong[],
    loading:false,
}

export interface PlayingAction extends StandardAction {
    payload?: {
        songs: CurrentSong[],
        queue: BasicSong[],
    }
}

export interface PlayingThunkAction extends ThunkAction<any, RootState, unknown, PlayingAction> {}
