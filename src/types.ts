import {Action} from "redux";

export interface RejectWithError {
    error: Error;
    context?: string;
}
export interface StandardAction extends Action {
    type: string,
    payload?: string|number|object,
    meta?: any,
    error?: Error,
}


export interface CurrentPlaylist {
    current?: CurrentSong,
    recent: CurrentSong[],
    queue: CurrentSong[],
    errorMessage?: string,
}

export interface BasicSong {
    id: number,
    artist: string,
    album: string|null,
    title: string|null,
    duration: number,
    picture: string,
    albumYear: string,
    votes: number,
    rating: number,
    userRating: number,
    dateLastPlayed: number,
    website: string,
    country: string,
}

export interface CurrentSong extends BasicSong {
    album: string,
    title: string,
    requester: string,
    msgname: string,
    msg: string,
    sinceStart: number,
    now: number,
    offset: number,
    listeners: number,
}

export interface SearchResult extends BasicSong {
    queued: boolean,
    recent: boolean,
    plays: number,
    songs: number,
    albums: number|null,
    userVotes: number,
    genre: string,
    track: number|null,
}

export interface BasicRating {
    votes: number,
    rating: number,
}

export interface UserRating extends BasicRating {
    userRating: number,
}

export interface SongRatingResponse {
    user: number;
    songID: number,
    rating?:UserRating;
    ratings: BasicRating[];
}

export interface SongRating {
    songID: number,
    rating?: UserRating,
    ratings: BasicRating[],
}

export interface SongRatingList {
    [key:number]: {
        rating: SongRating,
        loading: boolean,
        saving: boolean,
    },
}

export interface SaveRatingProps {
    songID: number,
    rating: number,
}

export interface SearchSorterProps {
    field: keyof SearchResult,
    ascending: boolean,
}

export interface SearchProps {
    for: SearchType;
    artist?: string|null;
    album?: string|null;
    song?: string|null;
    genre?: string|null;
    rated?: string | number | number[] | null;
    rating?: string | number | number[] | null;
    year?: string|null;
    country?: string|null;
    search?: string|null;
    followSingleResult?:boolean
}

export type SearchType = 'artists'|'albums'|'songs';

export interface SearchResponse {
    search: {
        responseType: SearchType,
        for: SearchType,
        userID: string,
        artist: string|null;
        album: string|null;
        country: string|null;
        title: string|null;
        genre: string|null;
        year: string|null;
        rated: number[];
        rating: number[];
        since: number|null;
        albums?: number|null;
        search?:string|null;
    },
    artists?: SearchResult[]
    albums?: SearchResult[]
    songs?: SearchResult[]
}

export interface SearchDefaultsResponse {
    genres: string[];
    years: string[];
    countries: string[];
}
