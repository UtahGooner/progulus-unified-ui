import {RootState} from "../index";
import {createAction, createReducer} from "@reduxjs/toolkit";

export interface ContextError {
    error: Error,
    context: string,
}

export interface Alert {
    id?: number,
    count?: number,
    message: string,
    name: string,
}

export interface AlertList {
    [key: string]: Alert,
}

export interface AlertState {
    id: number;
    list: AlertList;
}

export const defaultState: AlertState = {
    id: 0,
    list: {},
}
export const dismissAlertAction = createAction<string>('alerts/dismissAlert');
export const addAlert = createAction<Alert>('alerts/setAlert');

function isContextError(contextError: ContextError | unknown): contextError is ContextError {
    return (contextError as ContextError).error !== undefined;
}

export const selectAlertList = (state: RootState): AlertList => state.alerts.list;
export const selectAlert = (key: string) => (state: RootState): Alert | null => state.alerts.list[key] || null;

const alertsReducer = createReducer(defaultState, (builder) => {
    builder
        .addCase(dismissAlertAction, (state, action) => {
            delete state.list[action.payload];
        })
        .addCase(addAlert, (state, action) => {
            if (!action.payload.id) {
                state.id += 1;
                state.list[state.id.toString(36)] = {id: state.id, count: 1, ...action.payload};
            } else {
                state.list[action.payload.id.toString(36)] = {...action.payload, count: (action.payload.count ?? 0) + 1}
            }
        })
        .addMatcher(isContextError, (state, action) => {
            if (action.context && state.list[action.context] === undefined) {
                state.id += 1;
                state.list[action.context] = {
                    count: 1,
                    message: action.error.message,
                    name: action.context,
                    id: state.id
                };
            } else if (action.context && state.list[action.context]) {
                state.list[action.context].count = (state.list[action.context].count ?? 0) + 1;
            } else {
                state.list[state.id.toString(36)] = {
                    count: 1,
                    message: action.error.message,
                    name: state.id.toString(36),
                    id: state.id
                };
            }
        })
});

export default alertsReducer;
