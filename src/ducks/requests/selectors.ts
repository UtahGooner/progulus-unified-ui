import {RootState} from "../index";

export const selectCurrentPage = (state:RootState) => state.requests.currentPage;
export const selectSelectedSong = (state:RootState) => state.requests.selectedSong;

export const selectFilterArtists = (state:RootState):boolean => state.requests.filter.artists;
export const selectFilterAlbums = (state:RootState):boolean => state.requests.filter.albums;
export const selectFilterSongs = (state:RootState):boolean => state.requests.filter.songs;

export const selectFilterArtist = (state:RootState):string => state.requests.filter.artist;
export const selectFilterAlbum = (state:RootState):string => state.requests.filter.album;
export const selectFilterSong = (state:RootState):string => state.requests.filter.song;

export const selectFilterSearch = (state:RootState) => state.requests.filter.search;
export const selectFilterGenre = (state:RootState) => state.requests.filter.genre;
export const selectFilterYear = (state:RootState) => state.requests.filter.year;
export const selectFilterRating = (state:RootState) => state.requests.filter.rating;
export const selectFilterRated = (state:RootState) => state.requests.filter.rated;
export const selectFilterCountry = (state:RootState) => state.requests.filter.country;

export const selectFilter = (state:RootState) => state.requests.filter;

export const selectArtistsList = (state:RootState) => state.requests.artists.list;
export const selectArtistsCount = (state:RootState) => state.requests.artists.list.length;
export const selectArtistsLoading = (state:RootState) => state.requests.artists.loading;
export const selectAlbumsList = (state:RootState) => state.requests.albums.list;
export const selectAlbumsCount = (state:RootState) => state.requests.albums.list.length;
export const selectAlbumsLoading = (state:RootState) => state.requests.albums.loading;
export const selectSongsList = (state:RootState) => state.requests.songs.list;
export const selectSongsCount = (state:RootState) => state.requests.songs.list.length;
export const selectSongsLoading = (state:RootState) => state.requests.songs.loading;

export const selectGenresList = (state:RootState) => state.requests.filter.genreList;
export const selectCountryList = (state:RootState) => state.requests.filter.countryList;
export const selectYearList = (state:RootState) => state.requests.filter.yearList;
export const selectFiltersLoading = (state:RootState) => state.requests.filter.loading;
