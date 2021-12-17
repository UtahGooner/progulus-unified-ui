import {combineReducers} from "redux";

import {default as alertsReducer} from './alerts';
import {default as playingReducer} from './playing';
import {default as ratingReducer} from './rating';
import {default as userReducer} from './user';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    playing: playingReducer,
    rating: ratingReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
