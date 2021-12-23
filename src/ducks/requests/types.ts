import {SearchResult, StandardAction} from '../../types';
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";

export interface RequestAction extends StandardAction {
    payload?: {
        song?: SearchResult,
        list?: SearchResult[],
        toggle?: boolean,
        value?: string,
        rate?: number|null,
        search?: string,
        filters?: {
            genres: string[],
            years: string[],
            countries: string[],
        }
    }
}

export interface RequestThunkAction extends ThunkAction<any, RootState, unknown, RequestAction> {}

export interface SearchSorterProps {
    field: keyof SearchResult,
    ascending: boolean,
}
