import React, {useEffect} from "react";
import NowPlaying from "../ducks/playing/NowPlaying";
import {useDispatch} from "react-redux";
import {loadCurrentAction} from "../ducks/playing/actions";
import NowPlayingContainer from "../now-playing/NowPlayingContainer";

const App: React.FC = () => {
    return (
        <div className="container-lg">
            <div className="row g-3">
                <div className="col-md-8">
                    {/*<NowPlaying />*/}
                    <NowPlayingContainer />
                </div>
                <div className="col-md-4">
                    Tagboard container goes here.
                    {/*<iframe src="//gutenprog.com/gt6/auth/progulus/24/SteveM" name="tagframe4"*/}
                    {/*        style={{width:'100%', borderWidth:0, height: '570px'}} height="570" id="tagframe4" />*/}
                </div>
            </div>
        </div>
    )
}

export default App;
