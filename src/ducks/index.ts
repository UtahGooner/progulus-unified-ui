import {combineReducers} from "redux";

import {default as alertsReducer} from './alerts';
import {default as playingReducer} from './playing';
import {default as ratingReducer} from './rating';
import {default as userReducer} from './user';
import {default as requestsReducer} from './requests'

const rootReducer = combineReducers({
    alerts: alertsReducer,
    playing: playingReducer,
    rating: ratingReducer,
    requests: requestsReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
