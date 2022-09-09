import {combineReducers} from "redux";
import {StandardAction} from "../../types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {fetchJSON} from "../../utils/fetch";

export const cookiePrefix = 'phpbb3_3i246';

export interface UserProfile {
    user_id: number|string,
    user_regdate: number,
    username: string,
    user_avatar: string,
    session_id: string,
}

export interface UserAction extends StandardAction {
    payload?: {
        profile?: UserProfile,
    }
}

export interface UserThunkAction extends ThunkAction<any, RootState, unknown, UserAction>{}


export const userFetchRequested = 'user/fetchRequested';
export const userFetchSucceeded = 'user/fetchSucceeded';
export const userFetchFailed = 'user/fetchFailed';

export const fetchProfileAction = ():UserThunkAction => async (dispatch, getState) => {
    try {
        const state = getState();
        if (selectUserLoading(state)) {
            return;
        }
        dispatch({type: userFetchRequested});
        const {user} = await fetchJSON('/api/user/', {credentials: 'same-origin'});
        dispatch({type: userFetchSucceeded, payload: {profile: user}});
    } catch(error:unknown) {
        if (error instanceof Error) {
            console.log("fetchProfileAction()", error.message);
            return dispatch({type:userFetchFailed, error, meta: userFetchRequested});
        }
        console.error("fetchProfileAction()", error);
    }
}

export const selectUserId = (state:RootState) => state.user.id;
export const selectUserName = (state:RootState) => state.user.name;
export const selectUserAvatar = (state:RootState) => state.user.avatar;
export const selectUserSessionId = (state:RootState) => state.user.session;
export const selectUserLoading = (state:RootState) => state.user.loading;

const idReducer = (state:number = 0, action:UserAction):number => {
    const {type, payload} = action;
    switch (type) {
    case userFetchSucceeded:
        if (payload?.profile) {
            return Number(payload.profile.user_id);
        }
        return 1;
    default:
        return state;
    }
}

const nameReducer = (state:string = '', action:UserAction):string => {
    const {type, payload} = action;
    switch (type) {
    case userFetchSucceeded:
        if (payload?.profile) {
            return payload.profile.username;
        }
        return 'anonymous';
    default:
        return state;
    }
}

const avatarReducer = (state:string = '', action:UserAction):string => {
    const {type, payload} = action;
    switch (type) {
    case userFetchSucceeded:
        if (payload?.profile) {
            return payload.profile.user_avatar;
        }
        return '';
    default:
        return state;
    }
}

const sessionReducer = (state:string = '', action:UserAction):string => {
    const {type, payload} = action;
    switch (type) {
    case userFetchSucceeded:
        if (payload?.profile) {
            return payload.profile.session_id;
        }
        return '';
    default:
        return state;
    }
}

const loadingReducer = (state: boolean = false, action: UserAction):boolean => {
    switch (action.type) {
    case userFetchRequested:
        return true;
    case userFetchSucceeded:
    case userFetchFailed:
        return false;
    default: return state;
    }
}

export default combineReducers({
    id: idReducer,
    name: nameReducer,
    avatar: avatarReducer,
    session: sessionReducer,
    loading: loadingReducer,
});
