import {SearchResult} from "../../types";
import {RequestAction} from "./types";
import {sortAlbums, sortArtists} from "./sort";
import {combineReducers} from "redux";
import {
    albumMatch,
    albumPlusMatch,
    artistMatch,
    artistPlusMatch, requestFetchFiltersFailed, requestFetchFiltersRequested, requestFetchFiltersSucceeded,
    requestFilterArtist, requestFilterSetCountry, requestFilterSetGenre, requestFilterSetRated, requestFilterSetRating,
    requestFilterSetSearch, requestFilterSetYear,
    requestFilterToggleAlbums,
    requestFilterToggleArtists,
    requestFilterToggleSongs,
    requestsAlbumsSearchFailed,
    requestsAlbumsSearchRequested,
    requestsAlbumsSearchSucceeded,
    requestsArtistsSearchFailed,
    requestsArtistsSearchRequested,
    requestsArtistsSearchSucceeded,
    requestSearchSongsFailed,
    requestSearchSongsRequested,
    requestSearchSongsSucceeded,
    requestSelectSong, requestSetPage, requestsFilterAlbum, songMatch, songPlusMatch
} from "./actionTypes";

const currentPageReducer = (state:string = 'artists', action: RequestAction):string => {
    const {type, payload} = action;
    switch (type) {
    case requestSetPage:
        return payload?.value ?? 'artists';
    default: return state;
    }
}

const selectedSongReducer = (state: SearchResult | null = null, action: RequestAction): SearchResult | null => {
    const {type, payload} = action;
    switch (type) {
    case requestSelectSong:
        return payload?.song || null;
    default:
        return state;
    }
}

const filterArtistsReducer = (state: boolean = true, action: RequestAction): boolean => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterToggleArtists:
        if (payload?.toggle !== undefined) {
            return payload.toggle;
        }
        return !state;
    case requestFilterSetSearch:
        if (payload?.search) {
            if (/in:/i.test(payload.search)) {
                return /in:[\S]*artist/i.test(payload.search);
            }
        }
        return state;
    default:
        return state;
    }
}

const filterArtistReducer = (state:string = '', action:RequestAction): string => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterArtist:
        return payload?.value || '';
    case requestFilterSetSearch:
        if (payload?.search) {
            if (artistPlusMatch.test(payload.search)) {
                const match = artistPlusMatch.exec(payload.search);
                console.log('filterArtistReducer() artistPlusMatch', match);
                if (match && match[1]) {
                    return match[1];
                }
            } else if (artistMatch.test(payload.search)) {
                const match = artistMatch.exec(payload.search);
                console.log('filterArtistReducer() artistMatch', match);
                if (match && match[1]) {
                    return match[1];
                }
            }
        }
        return state;
    default: return state;
    }
}

const filterAlbumReducer = (state:string = '', action:RequestAction): string => {
    const {type, payload} = action;
    switch (type) {
    case requestsFilterAlbum:
        return payload?.value || '';
    case requestFilterSetSearch:
        if (payload?.search) {
            if (albumPlusMatch.test(payload.search)) {
                const match = albumPlusMatch.exec(payload.search);
                console.log('filterAlbumReducer() albumPlusMatch', match);
                if (match && match[1]) {
                    return match[1];
                }
            } else if (albumMatch.test(payload.search)) {
                const match = albumMatch.exec(payload.search);
                console.log('filterAlbumReducer() albumMatch', match);
                if (match && match[1]) {
                    return match[1];
                }
            }
        }
        return state;
    default: return state;
    }
}

const filterSongReducer = (state:string = '', action:RequestAction): string => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterArtist:
        return payload?.value || '';
    case requestFilterSetSearch:
        if (payload?.search) {
            if (songPlusMatch.test(payload.search)) {
                const match = songPlusMatch.exec(payload.search);
                console.log('filterSongReducer() songPlusMatch', match);
                if (match && match[1]) {
                    return match[1];
                }
            } else if (songMatch.test(payload.search)) {
                const match = songMatch.exec(payload.search);
                console.log('filterSongReducer() songMatch', match);
                if (match && match[1]) {
                    return match[1];
                }
            }
        }
        return state;
    default: return state;
    }
}

const filterAlbumsReducer = (state: boolean = true, action: RequestAction): boolean => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterToggleAlbums:
        if (payload?.toggle !== undefined) {
            return payload.toggle;
        }
        return !state;
    case requestFilterSetSearch:
        if (payload?.search) {
            if (/in:/i.test(payload.search)) {
                return /in:[\S]*album/i.test(payload.search);
            }
        }
        return state;
    default:
        return state;
    }
}

const filterSongsReducer = (state: boolean = true, action: RequestAction): boolean => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterToggleSongs:
        if (payload?.toggle !== undefined) {
            return payload.toggle;
        }
        return !state;
    case requestFilterSetSearch:
        if (payload?.search) {
            if (/in:/i.test(payload.search)) {
                return /in:[\S]*song/i.test(payload.search);
            }
        }
        return state;
    default:
        return state;
    }
}


const filterSearchReducer = (state: string = '', action: RequestAction): string => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterSetSearch:
        return payload?.search || '';
    default:
        return state;
    }
}

const filterYearReducer = (state:string = '', action:RequestAction):string => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterSetYear:
        return payload?.value || '';
    default:
        return state;
    }
}

const filterCountryReducer = (state:string = '', action:RequestAction):string => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterSetCountry:
        return payload?.value || '';
    default:
        return state;
    }
}

const filterRatedReducer = (state:number|null = null, action:RequestAction):number|null => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterSetRated:
        if (payload?.rate !== undefined) {
            return payload.rate === null ? null : payload.rate;
        }
        return null;
    default:
        return state;
    }
}

const filterRatingReducer = (state:number|null = null, action:RequestAction):number|null => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterSetRating:
        if (payload?.rate !== undefined) {
            return payload.rate === null ? null : payload.rate;
        }
        return null;
    default:
        return state;
    }
}

const filterGenreReducer = (state:string = '', action:RequestAction):string => {
    const {type, payload} = action;
    switch (type) {
    case requestFilterSetGenre:
        return payload?.value || '';
    default:
        return state;
    }
}

const filterGenreListReducer = (state: string[] = [], action: RequestAction): string[] => {
    const {type, payload} = action;
    switch (type) {
    case requestFetchFiltersSucceeded:
        if (payload?.filters) {
            return payload.filters.genres.sort();
        }
        return [];
    default:
        return state;
    }
}

const filterYearsListReducer = (state: string[] = [], action: RequestAction): string[] => {
    const {type, payload} = action;
    switch (type) {
    case requestFetchFiltersSucceeded:
        if (payload?.filters) {
            return payload.filters.years.sort().reverse();
        }
        return [];
    default:
        return state;
    }
}

const filterCountryListReducer = (state: string[] = [], action: RequestAction): string[] => {
    const {type, payload} = action;
    switch (type) {
    case requestFetchFiltersSucceeded:
        if (payload?.filters) {
            return payload.filters.countries.sort();
        }
        return [];
    default:
        return state;
    }
}

const filtersLoadingReducer = (state: boolean = false, action: RequestAction): boolean => {
    const {type} = action;
    switch (type) {
    case requestFetchFiltersRequested:
        return true;
    case requestFetchFiltersSucceeded:
    case requestFetchFiltersFailed:
        return false;
    default:
        return state;
    }
}


const filterReducer = combineReducers({
    artist: filterArtistReducer,
    album: filterAlbumReducer,
    song: filterSongReducer,
    artists: filterArtistsReducer,
    albums: filterAlbumsReducer,
    songs: filterSongsReducer,
    genre: filterGenreReducer,
    year: filterYearReducer,
    country: filterCountryReducer,
    rated: filterRatedReducer,
    rating: filterRatingReducer,
    search: filterSearchReducer,
    genreList: filterGenreListReducer,
    yearList: filterYearsListReducer,
    countryList: filterCountryListReducer,
    loading: filtersLoadingReducer,
})

const artistsListReducer = (state: SearchResult[] = [], action: RequestAction): SearchResult[] => {
    const {type, payload} = action;
    switch (type) {
    case requestsArtistsSearchSucceeded:
        if (payload?.list) {
            return payload.list.sort(sortArtists);
        }
        return [];
    default:
        return state;
    }
}

const artistsLoadingReducer = (state: boolean = false, action: RequestAction): boolean => {
    const {type} = action;
    switch (type) {
    case requestsArtistsSearchRequested:
        return true;
    case requestsArtistsSearchSucceeded:
    case requestsArtistsSearchFailed:
        return false;
    default:
        return state;
    }
}

const artistsReducer = combineReducers({list: artistsListReducer, loading: artistsLoadingReducer});

const albumsListReducer = (state: SearchResult[] = [], action: RequestAction): SearchResult[] => {
    const {type, payload} = action;
    switch (type) {
    case requestsAlbumsSearchSucceeded:
        if (payload?.list) {
            return payload.list.sort(sortAlbums);
        }
        return [];
    default:
        return state;
    }
}

const albumsLoadingReducer = (state: boolean = false, action: RequestAction): boolean => {
    const {type} = action;
    switch (type) {
    case requestsAlbumsSearchRequested:
        return true;
    case requestsAlbumsSearchSucceeded:
    case requestsAlbumsSearchFailed:
        return false;
    default:
        return state;
    }
}

const albumsReducer = combineReducers({list: albumsListReducer, loading: albumsLoadingReducer});

const songsListReducer = (state: SearchResult[] = [], action: RequestAction): SearchResult[] => {
    const {type, payload} = action;
    switch (type) {
    case requestSearchSongsSucceeded:
        if (payload?.list) {
            return payload.list.sort(sortArtists);
        }
        return [];
    default:
        return state;
    }
}

const songsLoadingReducer = (state: boolean = false, action: RequestAction): boolean => {
    const {type} = action;
    switch (type) {
    case requestSearchSongsRequested:
        return true;
    case requestSearchSongsSucceeded:
    case requestSearchSongsFailed:
        return false;
    default:
        return state;
    }
}

const songsReducer = combineReducers({list: songsListReducer, loading: songsLoadingReducer});



export default combineReducers({
    currentPage: currentPageReducer,
    selectedSong: selectedSongReducer,
    filter: filterReducer,
    artists: artistsReducer,
    albums: albumsReducer,
    songs: songsReducer,
});
