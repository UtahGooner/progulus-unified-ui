export const requestSetPage = 'requests/setPage';

export const requestFilterToggleArtists = 'requests/filter/toggleArtists';
export const requestFilterToggleAlbums = 'requests/filter/toggleAlbums';
export const requestFilterToggleSongs = 'requests/filter/toggleSongs';

export const requestFilterSetGenre = 'requests/filter/setGenre';
export const requestFilterSetYear = 'requests/filter/setYear';
export const requestFilterSetCountry = 'requests/filter/setCountry';
export const requestFilterSetRated = 'requests/filter/setRated';
export const requestFilterSetRating = 'requests/filter/setRating';
export const requestFilterSetSince = 'requests/filter/setSince';
export const requestFilterArtist = 'requests/filter/artist';
export const requestsFilterAlbum = 'requests/filter/album';
export const requestsFilterSong = 'requests/filter/song';

export const requestFilterSetSearch = 'requests/filter/setSearch';

export const requestSelectSong = 'requests/selectSong';

export const requestsArtistsSearchRequested = 'requests/artists/searchRequested';
export const requestsArtistsSearchSucceeded = 'requests/artists/searchSucceeded';
export const requestsArtistsSearchFailed = 'requests/artists/searchFailed';

export const requestsAlbumsSearchRequested = 'requests/albums/searchRequested';
export const requestsAlbumsSearchSucceeded = 'requests/albums/searchSucceeded';
export const requestsAlbumsSearchFailed = 'requests/albums/searchFailed';

export const requestSearchSongsRequested = 'requests/songs/searchRequested';
export const requestSearchSongsSucceeded = 'requests/songs/searchSucceeded';
export const requestSearchSongsFailed = 'requests/songs/searchFailed';

export const requestFetchFiltersRequested = 'requests/filters/fetchRequested';
export const requestFetchFiltersSucceeded = 'requests/filters/fetchSucceeded';
export const requestFetchFiltersFailed = 'requests/filters/fetchFailed';


export const artistPlusMatch = /artist:(.+?)(?=( [\w]+:))/i;
export const artistMatch = /artist:(.+?)$/i;
export const albumPlusMatch = /album:(.+?)(?=( [\w]+:))/i;
export const albumMatch = /album:(.+?)$/i;
export const songPlusMatch = /song:(.+?)(?=( [\w]+:))/i;
export const songMatch = /song:(.+?)$/i;

export const keywordsRegex = /(?:(artist|album|song|year|in|rated|rating|my):)(?=([\s\S]+))/g;

