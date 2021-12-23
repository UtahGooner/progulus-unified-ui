import React from 'react';

const HeaderLogo:React.FC = () => {
    return (
        <h1 className="d-none d-lg-block" id="progulus--header-logo-container">
            <div id="progulus--header-logo" />
            <div className="visually-hidden">Progulus Radio</div>
            <small className="visually-hidden">A mountain stream of Progressive Rock and Metal</small>
        </h1>
    )
}
export default HeaderLogo;
