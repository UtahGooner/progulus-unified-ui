import React, {useEffect} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NowPlaying from "../ducks/playing/NowPlaying";
import {useDispatch} from "react-redux";
import {loadCurrentAction} from "../ducks/playing/actions";
import ErrorBoundary from "./ErrorBoundary";
import Queue from "../ducks/playing/Queue";
import RecentSongs from "../ducks/playing/RecentSongs";
import AlertList from "../ducks/alerts/AlertList";
import NavBar from "./NavBar";
import HeaderLogo from "./HeaderLogo";
import SubHeader from "./SubHeader";
import TagBoardContainer from "./TagBoardContainer";
import ArtistPage from "./ArtistPage";
import RequestSearchFilter from "../ducks/requests/RequestSearchFilter";
import RequestPage from "../ducks/requests/RequestPage";

const App: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCurrentAction());
    }, [])
    return (
        <Router basename="/ui">
            <header>
                <NavBar />
                <HeaderLogo />
            </header>
            <main id="progulus--main-body" className="container-fluid container-xl">
                <SubHeader />
                <div className="row g-3">
                    <div className="col-12 col-md-7 col-lg-8 col-xl-9">
                        <AlertList />
                        <Route path={["/", '/now-playing']} exact>
                            <ErrorBoundary>
                                <NowPlaying />
                                <Queue />
                                <RecentSongs />
                            </ErrorBoundary>
                        </Route>
                        <Route path="/request/:section?">
                            <ErrorBoundary>
                                <RequestPage />
                            </ErrorBoundary>
                        </Route>
                        <Route path="/history">
                            <h2>History goes here.</h2>
                        </Route>
                        <Route path="/search">
                            <h2>How should this be different than request page?</h2>
                        </Route>
                        <Route path="/forums">
                            <h2>Maybe I can pull the forums in?</h2>
                        </Route>
                        <Route path="/artist/:artist/:album?">
                            <ArtistPage />
                        </Route>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                        <TagBoardContainer />
                    </div>
                </div>
            </main>
        </Router>
    )
}

export default App;
