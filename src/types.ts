import {Action} from "redux";

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

export interface SongRating {
    songID?: number,
    rating: UserRating,
    ratings: BasicRating[],
}

export interface SongRatingList {
    [key:number]: SongRating,
}
