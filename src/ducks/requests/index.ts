import {SearchDefaultsResponse, SearchProps, SearchResult} from "../../types";
import {createAction, createAsyncThunk, createReducer, createSelector} from "@reduxjs/toolkit";
import {fetchSearch, fetchSearchDefaults} from "../../api/songs";
import Debug from 'debug';
import {RootState} from "../../app/configureStore";
import {sortAlbums, sortArtists, sortSongs} from "./sort";

const debug = Debug('progulus:requests');

export interface RequestFilterSection {
    list?: string[];
    loading?: boolean;
    current: string;
}

export interface RequestResponseSection {
    list?: SearchResult[];
    loading?: boolean;
    current: SearchResult | null;
    filter: string;
}

export interface RequestsState {
    currentPage: string;
    search: string,
    genre: RequestFilterSection;
    year: RequestFilterSection;
    country: RequestFilterSection;
    artists: RequestResponseSection;
    albums: RequestResponseSection;
    songs: RequestResponseSection;
    rating: RequestFilterSection;
    rated: RequestFilterSection;
}

export const defaultFilterSection: RequestFilterSection = {
    list: [],
    loading: false,
    current: '',
}
export const defaultResponseSection: RequestResponseSection = {
    list: [],
    loading: false,
    current: null,
    filter: '',
}

export const defaultState: RequestsState = {
    currentPage: 'artists',
    search: '',
    genre: {...defaultFilterSection},
    year: {...defaultFilterSection},
    country: {...defaultFilterSection},
    rating: {...defaultFilterSection},
    rated: {...defaultFilterSection},
    artists: {...defaultResponseSection},
    albums: {...defaultResponseSection},
    songs: {...defaultResponseSection},
}

export const setPage = createAction<string>('requests/setPage');
export const setSearch = createAction<string>('requests/setSearch');
export const setCurrentGenre = createAction<string>('requests/genre/setSearch');
export const setCurrentYear = createAction<string>('requests/year/setSearch');
export const setCurrentCountry = createAction<string>('requests/country/setSearch');
export const setCurrentRating = createAction<string>('requests/rating/setSearch');
export const setCurrentRated = createAction<string>('requests/rated/setSearch');
export const setArtistSearch = createAction<string>('requests/artists/setSearch');
export const setAlbumSearch = createAction<string>('requests/albums/setSearch');
export const setSongSearch = createAction<string>('requests/songs/setSearch');

const loadDefaultsPrefix = 'requests/default/load';
const loadArtistsPrefix = 'requests/artists/load';
const loadAlbumsPrefix = 'requests/albums/load';
const loadSongsPrefix = 'requests/songs/load';

export const loadSearchDefaults = createAsyncThunk(
    loadDefaultsPrefix,
    async (arg: void, thunkAPI): Promise<SearchDefaultsResponse | null> => {
        try {
            return await fetchSearchDefaults();
        } catch (err: unknown) {
            if (err instanceof Error) {
                debug("loadSearchDefaults()", err.message);
                thunkAPI.rejectWithValue({error: err, context: loadDefaultsPrefix});
                return null;
            }
            debug("loadSearchDefaults()", err);
            return {countries: [], genres: [], years: []}
        }

    }
)

export const loadArtists = createAsyncThunk(
    loadArtistsPrefix,
    async (arg: Partial<SearchProps>, thunkAPI): Promise<SearchResult[]> => {
        try {
            const artists = await fetchSearch({...arg, for: 'artists'});
            if (arg.followSingleResult && artists.length === 1) {
                thunkAPI.dispatch(loadAlbums({...arg, artist: artists[0].artist}))
            }
            return artists;
        } catch (err: unknown) {
            if (err instanceof Error) {
                debug("loadSearchDefaults()", err.message);
                thunkAPI.rejectWithValue({error: err, context: loadDefaultsPrefix});
                return [];
            }
            debug("loadSearchDefaults()", err);
            return [];
        }
    }
)

export const loadAlbums = createAsyncThunk(
    loadAlbumsPrefix,
    async (arg: Partial<SearchProps>, thunkAPI): Promise<SearchResult[]> => {
        try {
            const albums = await fetchSearch({...arg, for: 'albums'});
            if (arg.followSingleResult && albums.length === 1) {
                thunkAPI.dispatch(loadSongs({...arg, artist: albums[0].artist, album: albums[0].album}));
            }
            return  albums;
        } catch (err: unknown) {
            if (err instanceof Error) {
                debug("loadSearchDefaults()", err.message);
                thunkAPI.rejectWithValue({error: err, context: loadDefaultsPrefix});
                return [];
            }
            debug("loadSearchDefaults()", err);
            return [];
        }
    }
)

export const loadSongs = createAsyncThunk(
    loadSongsPrefix,
    async (arg: Partial<SearchProps>, thunkAPI): Promise<SearchResult[]> => {
        try {
            const state = thunkAPI.getState();

            return await fetchSearch({...arg, for: 'songs'});
        } catch (err: unknown) {
            if (err instanceof Error) {
                debug("loadSearchDefaults()", err.message);
                thunkAPI.rejectWithValue({error: err, context: loadDefaultsPrefix});
                return [];
            }
            debug("loadSearchDefaults()", err);
            return [];
        }
    }
)

/* SELECTORS ************************************/

export const selectCurrentPage = (state:RootState) => state.requests.currentPage;
export const selectSelectedSong = (state:RootState) => state.requests.songs.current;

export const selectFilterArtist = (state:RootState):string => state.requests.artists.filter;
export const selectFilterAlbum = (state:RootState):string => state.requests.albums.filter;
export const selectFilterSong = (state:RootState):string => state.requests.songs.filter;

export const selectFilterSearch = (state:RootState) => state.requests.search;
export const selectFilterGenre = (state:RootState) => state.requests.genre.current;
export const selectFilterYear = (state:RootState) => state.requests.year.current;
export const selectFilterRating = (state:RootState) => state.requests.rating.current;
export const selectFilterRated = (state:RootState) => state.requests.rated.current;
export const selectFilterCountry = (state:RootState) => state.requests.country.current;

export const selectArtistsList = (state:RootState) => state.requests.artists.list ?? [];
export const selectArtistsCount = (state:RootState) => state.requests.artists.list?.length ?? 0;
export const selectArtistsLoading = (state:RootState) => state.requests.artists.loading ?? false;
export const selectAlbumsList = (state:RootState) => state.requests.albums.list ?? [];
export const selectAlbumsCount = (state:RootState) => state.requests.albums.list?.length ?? 0;
export const selectAlbumsLoading = (state:RootState) => state.requests.albums.loading ?? false;
export const selectSongsList = (state:RootState) => state.requests.songs.list ?? [];
export const selectSongsCount = (state:RootState) => state.requests.songs.list?.length ?? 0;
export const selectSongsLoading = (state:RootState) => state.requests.songs.loading ?? false;

export const selectGenresList = (state:RootState) => state.requests.genre.list ?? [];
export const selectCountryList = (state:RootState) => state.requests.country.list ?? [];
export const selectYearList = (state:RootState) => state.requests.year.list ?? [];
export const selectFiltersLoading = (state:RootState) => state.requests.genre.loading ?? false;

export const selectSearchParams = createSelector(
    [selectFilterArtist, selectFilterAlbum, selectFilterSong, selectFilterGenre,
        selectFilterRated, selectFilterRating, selectFilterYear, selectFilterCountry, selectFilterSearch],
    (artist, album, song, genre, rated, rating, year, country, search) => {
        return {
            artist,
            album,
            song,
            genre,
            rated,
            rating,
            year,
            country,
            search
        } as Partial<SearchProps>;
    }
)

/* REDUCER ***************************************/
const requestsReducer = createReducer(defaultState, (builder) => {
    builder
        .addCase(setPage, (state, action) => {
            state.currentPage = action.payload;
        })
        .addCase(setArtistSearch, (state, action) => {
            state.artists.filter = action.payload;
        })
        .addCase(setAlbumSearch, (state, action) => {
            state.albums.filter = action.payload;
        })
        .addCase(setSongSearch, (state, action) => {
            state.songs.filter = action.payload;
        })
        .addCase(setCurrentGenre, (state, action) => {
            state.genre.current = action.payload;
        })
        .addCase(setCurrentCountry, (state, action) => {
            state.country.current = action.payload;
        })
        .addCase(setCurrentYear, (state, action) => {
            state.year.current = action.payload;
        })
        .addCase(setCurrentRated, (state, action) => {
            state.rated.current = action.payload;
        })
        .addCase(setCurrentRating, (state, action) => {
            state.rating.current = action.payload;
        })
        .addCase(loadSearchDefaults.pending, (state, action) => {
            state.genre.loading = true;
            state.year.loading = true;
            state.country.loading = true;
        })
        .addCase(loadSearchDefaults.rejected, (state, action) => {
            state.genre.loading = false;
            state.year.loading = false;
            state.country.loading = false;
        })
        .addCase(loadSearchDefaults.fulfilled, (state, action) => {
            state.genre.loading = false;
            state.genre.list = action.payload?.genres || [];
            state.year.loading = false;
            state.year.list = action.payload?.years || [];
            state.country.loading = false;
            state.country.list = action.payload?.countries || [];
        })
        .addCase(loadArtists.pending, (state) => {
            state.artists.loading = true;
        })
        .addCase(loadArtists.rejected, (state) => {
            state.artists.loading = false;
        })
        .addCase(loadArtists.fulfilled, (state, action) => {
            state.artists.loading = false;
            state.artists.list = action.payload.sort(sortArtists);
        })
        .addCase(loadAlbums.pending, (state) => {
            state.albums.loading = true;
        })
        .addCase(loadAlbums.rejected, (state) => {
            state.albums.loading = false;
        })
        .addCase(loadAlbums.fulfilled, (state, action) => {
            state.albums.loading = false;
            state.albums.list = action.payload.sort(sortAlbums);
        })
        .addCase(loadSongs.pending, (state) => {
            state.songs.loading = true;
        })
        .addCase(loadSongs.rejected, (state) => {
            state.songs.loading = false;
        })
        .addCase(loadSongs.fulfilled, (state, action) => {
            state.songs.loading = false;
            state.songs.list = action.payload.sort(sortSongs);
        })
});

export default requestsReducer;
