import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import HideOnScroll from "./HideOnScroll";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfileAction, selectUserAvatar, selectUserName} from "../ducks/user";

const NavBar: React.FC = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const userName = useSelector(selectUserName);
    const userAvatar = useSelector(selectUserAvatar);

    useEffect(() => {
        dispatch(fetchProfileAction());
    }, [])

    const onToggleMenu = () => {
        setShow(!show);
    }
    const navbarClassName = classNames('navbar-collapse', {collapse: true, show: show})


    return (
        <Router>
            <HideOnScroll>
                <div className="navbar navbar-nav navbar-expand-sm navbar-light bg-light fixed-top">
                    <div className="container-fluid">
                        <NavLink to="/ui/" className="navbar-brand">
                            <img src="/rprweb/images/progulus-logo-1.png" alt="Progulus"
                                 style={{maxHeight: '40px', width: 'auto'}}/>
                        </NavLink>
                        <button className="navbar-toggler" type="button" onClick={onToggleMenu}>
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className={navbarClassName}>
                            <ul className="navbar-nav me-auto mb-2">
                                <li className="nav-item">
                                    <NavLink to="/ui/now-playing" className="nav-link">Now Playing</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/ui/request" className="nav-link">Request</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/ui/history" className="nav-link">History</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/ui/search" className="nav-link">Search</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a href="/phpBB3" target="_blank" className="nav-link">Forums</a>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex">
                            {!!userAvatar && (
                                <div className="me-1">
                                    <img src={`/phpBB3/download/file.php?avatar=${encodeURIComponent(userAvatar)}`}
                                           alt={userName} loading="lazy" style={{maxHeight: '40px', width: 'auto'}}/>
                                </div>
                            )}
                            {!userAvatar && (
                                <div className="bi-person-bounding-box me-1" />
                            )}
                            <div className="d-none d-md-block">{userName}</div>
                        </div>
                    </div>
                </div>
            </HideOnScroll>
        </Router>
    )
}

export default NavBar;

