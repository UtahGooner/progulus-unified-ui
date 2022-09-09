import {CurrentSong, SongRating, SongRatingList, StandardAction} from "../../types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";



export interface RatingAction extends StandardAction {
    payload?: {
        songID?: number,
        rating?: SongRating,
        songs?: CurrentSong[]
    }
}

export interface RatingThunkAction extends ThunkAction<any, RootState, unknown, RatingAction> {
}

