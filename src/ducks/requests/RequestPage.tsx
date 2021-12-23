import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSearchFiltersAction, setPageAction} from "./actions";
import RequestSearchFilter from "./RequestSearchFilter";
import {selectAlbumsCount, selectArtistsCount, selectCurrentPage, selectSongsCount} from "./selectors";
import RequestPageTabs from "./RequestPageTabs";
import {Route, useHistory, useLocation, useParams} from "react-router-dom";
import RequestArtistList from "./RequestArtistList";
import RequestAlbumList from "./RequestAlbumList";

interface ParamsType {
    section?: string,
}

const RequestPage: React.FC = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const history = useHistory();
    const params = useParams<ParamsType>();
    console.log(params);

    useEffect(() => {
        if (!params.section) {
            history.push(`/request/${currentPage}`);
        } else if (params.section !== currentPage) {
            dispatch(setPageAction(params.section));
        }
    }, [params.section]);

    useEffect(() => {
        dispatch(fetchSearchFiltersAction())
    }, [])
    return (
        <div className="progulus--request">
            <h2 className="visually-hidden">Search/Request Songs</h2>
            <RequestSearchFilter/>
            <RequestPageTabs/>
            <Route path="/request/artists">
                <RequestArtistList />
            </Route>
            <Route path="/request/albums">
                <RequestAlbumList />
            </Route>
        </div>
    )
}

export default RequestPage;
