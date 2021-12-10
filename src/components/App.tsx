import React, {useEffect} from "react";
import NowPlaying from "../ducks/playing/NowPlaying";
import {useDispatch} from "react-redux";
import {loadCurrentAction} from "../ducks/playing/actions";

const App: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCurrentAction());
    }, [])
    return (
        <div className="container-lg">
            <NowPlaying />
        </div>
    )
}

export default App;
