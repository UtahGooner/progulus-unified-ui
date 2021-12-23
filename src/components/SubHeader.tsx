import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentSong, selectListenerCount} from "../ducks/playing";
import {Route, Switch} from "react-router-dom";
import SubHeaderNowPlaying from "../ducks/playing/SubHeaderNowPlaying";

const SubHeader: React.FC = () => {
    const listeners = useSelector(selectListenerCount);
    const currentSong = useSelector(selectCurrentSong);

    return (
        <section className="progulus--sub-header">
            <div className="d-flex justify-content-end">
                <div>
                    <a href="https://www.patreon.com/bePatron?u=50361285" target="_blank" rel="noopener"
                       data-patreon-widget-type="become-patron-button">
                        Become a Patron!
                    </a>
                </div>
            </div>
            <div className="row g-3 align-items-baseline">
                <div className="d-none d-md-block col-8 col-md-7 col-lg-8 col-xl-9">
                    <div>
                        <span className="me-3">Now playing:</span>
                        <Switch>
                            <Route path={["/", '/now-playing']} exact>
                                Regular Schedule
                            </Route>
                            {currentSong?.artist && (
                                <Route>
                                    <SubHeaderNowPlaying/>
                                </Route>
                            )}
                        </Switch>
                    </div>
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
