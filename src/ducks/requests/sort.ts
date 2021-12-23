import {SearchSorterProps} from "./types";
import {SearchResult} from "../../types";

export const defaultArtistSortProps:SearchSorterProps = {field: 'artist', ascending: true};

export const sortArtists = (a:SearchResult, b:SearchResult) => {
    return a.artist.toLowerCase() === b.artist.toLowerCase()
        ?  0
        : (a.artist.toLowerCase() > b.artist.toLowerCase() ? 1 : -1);
}

export const sortAlbums = (a:SearchResult, b:SearchResult) => {
    return (a.album || '').toLowerCase() === (b.album || '').toLowerCase()
        ?  (a.albumYear > b.albumYear ? 1 : -1)
        : ((a.album || '').toLowerCase() > (b.album || '').toLowerCase() ? 1 : -1);
}

export const sortSongs = (a:SearchResult, b:SearchResult) => a.id - b.id;
