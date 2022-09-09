import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import HideOnScroll from "./HideOnScroll";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfileAction, selectUserAvatar, selectUserId, selectUserName} from "../ducks/user";
import {useAppDispatch} from "../app/configureStore";

const NavBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const userId = useSelector(selectUserId);
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
        <HideOnScroll>
            <div className="navbar navbar-nav navbar-expand-sm navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">
                        <img src="/rprweb/images/progulus-logo-1.png" alt="Progulus"
                             style={{maxHeight: '40px', width: 'auto'}}/>
                    </NavLink>
                    <button className="navbar-toggler" type="button" onClick={onToggleMenu}>
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className={navbarClassName}>
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <NavLink to="/now-playing" className="nav-link">Now Playing</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/request" className="nav-link">Request</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/history" className="nav-link">History</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/search" className="nav-link">Search</NavLink>
                            </li>
                            <li className="nav-item">
                                <a href="/phpBB3" target="_blank" className="nav-link">Forums</a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item d-none d-md-block">
                                {!!userAvatar && (
                                    <div className="me-1 nav-link">
                                        <img src={`/phpBB3/download/file.php?avatar=${encodeURIComponent(userAvatar)}`}
                                             alt={userName} loading="lazy" style={{maxHeight: '40px', width: 'auto'}}/>
                                    </div>
                                )}
                                {!userAvatar && (
                                    <div className="bi-person-bounding-box me-1 nav-link"/>
                                )}
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">{userId === 1 ? 'Login' : userName}</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </HideOnScroll>
    )
}


export default NavBar;

