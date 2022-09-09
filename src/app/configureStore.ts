import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";

import {default as alertsReducer} from '../ducks/alerts';
import {default as playingReducer} from '../ducks/playing';
import {default as ratingReducer} from '../ducks/rating';
import {default as userReducer} from '../ducks/user';
import {default as requestsReducer} from '../ducks/requests'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    alerts: alertsReducer,
    playing: playingReducer,
    rating: ratingReducer,
    requests: requestsReducer,
    user: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error'],
        }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
