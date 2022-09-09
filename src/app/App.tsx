import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NowPlaying from "../ducks/playing/NowPlaying";
import ErrorBoundary from "../components/ErrorBoundary";
import Queue from "../ducks/playing/Queue";
import RecentSongs from "../ducks/playing/RecentSongs";
import AlertList from "../ducks/alerts/AlertList";
import NavBar from "../components/NavBar";
import HeaderLogo from "../components/HeaderLogo";
import SubHeader from "../components/SubHeader";
import TagBoardContainer from "../components/TagBoardContainer";
// import ArtistPage from "./ArtistPage";
// import RequestPage from "../ducks/requests/RequestPage";
// import LoginPage from "./LoginPage";
import {loadCurrentAction, selectHistoryCount} from "../ducks/playing";
import {useAppDispatch, useAppSelector} from "./configureStore";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const historyCount = useAppSelector(selectHistoryCount);

    useEffect(() => {
        dispatch(loadCurrentAction(historyCount));
    }, [])


    return (
        <BrowserRouter basename="/ui">
            <header>
                <NavBar/>
                <HeaderLogo/>
            </header>
            <main id="progulus--main-body" className="container-fluid container-xl">
                <SubHeader/>
                <div className="row g-3">
                    <div className="col-12 col-md-7 col-lg-8 col-xl-9">
                        <AlertList/>
                        <Routes>
                            <Route path="/" element={<NowPlaying/>}>
                                <Route path="now-playing" element={<NowPlaying/>}/>
                                <Route path="now-playing" element={<Queue/>}/>
                                <Route path="now-playing" element={<RecentSongs/>}/>
                            </Route>
                        </Routes>
                    {/*    <Route path={["/", '/now-playing']} exact>*/}
                    {/*        <ErrorBoundary>*/}
                    {/*            <NowPlaying/>*/}
                    {/*            <Queue/>*/}
                    {/*            <RecentSongs/>*/}
                    {/*        </ErrorBoundary>*/}
                    {/*    </Route>*/}
                    {/*    <Route path="/request/:section?">*/}
                    {/*        <ErrorBoundary>*/}
                    {/*            <RequestPage/>*/}
                    {/*        </ErrorBoundary>*/}
                    {/*    </Route>*/}
                    {/*    <Route path="/history">*/}
                    {/*        <h2>History goes here.</h2>*/}
                    {/*    </Route>*/}
                    {/*    <Route path="/search">*/}
                    {/*        <h2>How should this be different than request page?</h2>*/}
                    {/*    </Route>*/}
                    {/*    <Route path="/forums">*/}
                    {/*        <h2>Maybe I can pull the forums in?</h2>*/}
                    {/*    </Route>*/}
                    {/*    <Route path="/artist/:artist/:album?">*/}
                    {/*        <ArtistPage/>*/}
                    {/*    </Route>*/}
                    {/*    <Route path="/login">*/}
                    {/*        <LoginPage/>*/}
                    {/*    </Route>*/}
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                        <TagBoardContainer/>
                    </div>
                </div>
            </main>
        </BrowserRouter>
    )
}

export default App;
