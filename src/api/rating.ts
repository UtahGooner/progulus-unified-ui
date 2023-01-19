import {SongRating, SongRatingResponse} from "../types";
import {fetchJSON} from "../utils/fetch";

const ratingURL = (songID: number) => `/api/rating/rating.php?songID=${encodeURIComponent(songID)}`;
const rateURL = '/api/rating/rate.php';


export async function fetchRating(id: number):SongRating  {
    const {songID, rating, ratings} = await fetchJSON<SongRatingResponse>(ratingURL(id));
    return {songID, rating, ratings};
}
