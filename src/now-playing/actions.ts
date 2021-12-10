import {fetchJSON} from "../utils/fetch";
import {CurrentPlaylist} from "../types";

export async function fetchNowPlaying():Promise<CurrentPlaylist> {
    try {
        const response = await fetchJSON('/api/playing/', {cache: "no-cache"})
        console.log(response);
        const [current, ...recent] = response.songs || [];
        const queue = response.queue || [];
        return {current, recent, queue};
    } catch(error:unknown) {
        if (error instanceof Error) {
            console.log("fetchNowPlaying()", error.message);
            return {recent: [], queue: [], errorMessage: error.message}
        }
        console.error("fetchNowPlaying()", error);
        return {recent: [], queue: []}
    }
}
