import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentSong, selectListenerCount} from "../ducks/playing";
import {Route, Switch} from "react-router-dom";
import ArtistLink from "./ArtistLink";

const SubHeader:React.FC = () => {
    const listeners = useSelector(selectListenerCount);
    const currentSong = useSelector(selectCurrentSong);

    return (
        <section className="progulus--sub-header">
            <div className="row g-3">
                <div className="d-none d-md-block col-8 col-md-7 col-lg-8 col-xl-9">
                    <Switch>
                        <Route path={["/", '/now-playing']} exact>
                            <div><span className="me-1">Now playing:</span> Regular Schedule</div>
                        </Route>
                        {currentSong?.artist && (
                            <Route>
                                <div>
                                    <span className="me-1">Now playing:</span>
                                    <strong>{currentSong.title}</strong> by <ArtistLink artist={currentSong.artist} />
                                </div>
                            </Route>
                        )}
                    </Switch>
                </div>
                <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                    <div className="progulus--current-listeners">
                        <div>Listeners</div>
                        <div id="progulus--listeners">{listeners || '-'}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubHeader;
