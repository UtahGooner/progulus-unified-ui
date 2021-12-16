import React, {useEffect} from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import NowPlaying from "../ducks/playing/NowPlaying";
import {useDispatch} from "react-redux";
import {loadCurrentAction} from "../ducks/playing/actions";
import ErrorBoundary from "./ErrorBoundary";
import Queue from "../ducks/playing/Queue";
import RecentSongs from "../ducks/playing/RecentSongs";

const App: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCurrentAction());
    }, [])
    return (
        <Router>
            <ErrorBoundary>
                <NowPlaying />
                <Queue />
                <RecentSongs />
            </ErrorBoundary>
        </Router>
    )
}

export default App;
