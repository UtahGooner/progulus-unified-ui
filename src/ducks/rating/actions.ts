import {RatingThunkAction} from "./types";
import {loadRatingFailed, saveRatingFailed, saveRatingRequested, saveRatingSucceeded} from "./index";
// import {loadCurrentRequested, loadCurrentSucceeded} from "../playing";
import {fetchJSON} from "../../utils/fetch";
import {BasicRating, SongRating, UserRating} from "../../types";
import {selectUserId} from "../user";

const ratingURL = (songID: number) => `/api/rating/rating.php?songID=${encodeURIComponent(songID)}`;
const rateURL = '/api/rating/rate.php';

export const loadRatingAction = (songID: number): RatingThunkAction =>
    async (dispatch, getState) => {
        try {
            // dispatch({type: loadCurrentRequested, payload: {songID}});
            const rating: SongRating = await fetchJSON(ratingURL(songID));
            // dispatch({type: loadCurrentSucceeded, payload: {rating}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("loadRatingAction()", error.message);
                dispatch({type: loadRatingFailed, error, payload: {songID}});
                return;
            }
            console.error('loadRatingAction', error);
        }
    }

export const saveRatingAction = (songID: number, rating: number): RatingThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectUserId(state) === 1) {
                return;
            }
            dispatch({type: saveRatingRequested, payload: {songID}});
            const body = {songID, rating};
            const newRating: SongRating = await fetchJSON(rateURL, {method: 'POST'}, body);
            dispatch({type: saveRatingSucceeded, payload: {rating: newRating}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("saveRatingAction()", error.message);
                dispatch({type: saveRatingFailed, error, payload: {songID}});
            }
            console.error(error);
        }
    }
