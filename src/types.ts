import {Action} from "redux";

export interface StandardAction extends Action {
    type: string,
    payload?: string|number|object,
    meta?: any,
    error?: Error,
}

export interface BasicSong {
    id: number,
    artist: string,
    album: string,
    title: string,
    duration: number,
    picture: string,
    albumYear: string,
    votes: number,
    rating: number,
    userRating: number,
    dateLastPlayed: number,
}

export interface CurrentSong extends BasicSong {
    website: string,
    requester: string,
    msgname: string,
    msg: string,
    sinceStart: number,
    now: number,
    offset: number,
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
