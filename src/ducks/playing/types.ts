import {BasicSong, CurrentSong, StandardAction} from "../../types";
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";


export interface PlayingState {
    current: CurrentSong | null,
    history: CurrentSong[],
    queue: CurrentSong[],
    loading:boolean,
    count: number
}

export interface PlayingAction extends StandardAction {
    payload?: {
        songs?: CurrentSong[],
        queue?: CurrentSong[],
        count?: number,
    }
}

export interface PlayingThunkAction extends ThunkAction<any, RootState, unknown, PlayingAction> {}
