import {combineReducers} from "redux";

import {default as playingReducer} from './playing';
import {default as ratingReducer} from './rating';

const rootReducer = combineReducers({
    playing: playingReducer,
    rating: ratingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
