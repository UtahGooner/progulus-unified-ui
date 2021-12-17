import {combineReducers} from "redux";
import {StandardAction} from "../../types";
import {RootState} from "../index";

export interface Alert {
    count: number,
    message: string,
    name: string,
}
export interface AlertList {
    [key:string]: Alert,
}

export interface AlertAction extends StandardAction {
    payload?: {
        key: string,
    }
}

const dismissAlert = 'alerts/dismissAlert';
export const dismissAlertAction = (key:string):AlertAction => ({type: dismissAlert, payload: {key}});

export const selectAlertList = (state:RootState):AlertList => state.alerts.list;
export const selectAlert = (key:string) => (state:RootState):Alert|null => state.alerts.list[key] || null;

const listReducer = (state: AlertList = {}, action:AlertAction):AlertList => {
    if (action.type === dismissAlert && action?.payload?.key && state[action.payload.key]) {
        const newState = {...state};
        delete newState[action.payload.key];
        return newState;
    }

    if (action.error) {
        if (!state[action.type]) {
            const alert:Alert = {count: 1, message: action.error.message, name: action.error.name};
            return {
                ...state,
                [action.type]: alert,
            }
        }
        const {count, message, name} = state[action.type];
        return {
            ...state,
            [action.type]: {count: count + 1, message, name},
        }
    }
    return state;
}

export default combineReducers({
    list: listReducer,
});

