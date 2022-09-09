import React, {useEffect} from "react";
import {useSelector} from "react-redux";

import RequestSearchFilter from "./RequestSearchFilter";
import {loadSearchDefaults, selectCurrentPage, setPage} from "./index";
import RequestPageTabs from "./RequestPageTabs";
import {Route, useNavigate, useParams} from "react-router-dom";
import RequestArtistList from "./RequestArtistList";
import RequestAlbumList from "./RequestAlbumList";
import {useAppDispatch} from "../../app/configureStore";

interface ParamsType {
    section?: string,
}

const RequestPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    useEffect(() => {
        if (!params.section) {
            navigate(`/request/${currentPage}`);
        } else if (params.section !== currentPage) {
            dispatch(setPage(params.section));
        }
    }, [params.section]);

    useEffect(() => {
        dispatch(loadSearchDefaults())
    }, [])
    return (
        <div className="progulus--request">
            <h2 className="visually-hidden">Search/Request Songs</h2>
            <RequestSearchFilter/>
            <RequestPageTabs/>
            <Route path="/request/artists">
                <RequestArtistList/>
            </Route>
            <Route path="/request/albums">
                <RequestAlbumList/>
            </Route>
        </div>
    )
}

export default RequestPage;
