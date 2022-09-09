import React, {useEffect, useState} from 'react';
import {fetchHTML} from "../utils/fetch";
import {useSelector} from "react-redux";
import {selectUserSessionId} from "../ducks/user";

async function getLoginToken() {
    try {
        return await fetchHTML('/api/user/login_token.php', {credentials: 'same-origin'});
    } catch(error:unknown) {
        if (error instanceof Error) {
            console.log("getLoginToken()", error.message);
            return `<div class="alert alert-danger">Unable to load login token; ${error.message}</div>`;
        }
        return `<div class="alert alert-danger">Unable to load login token.</div>`;
    }
}
const LoginPage:React.FC = () => {
    const sid = useSelector(selectUserSessionId)
    const [html, setHtml] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    useEffect(() => {
        setLoading(true)
        getLoginToken()
            .then(token => {
                setHtml(token);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof Error) {
                    setHtml(`<div class="alert alert-danger">Error loading login token; ${err.message}</div>`);
                }
                setLoading(false);
            })
    }, [])


    return (
        <div>
            <h3>Login</h3>
            <div>
                <form action="https://progulus.com/phpBB3/ucp.php" method="post">
                    <input type="hidden" name="redirect" value="/ui/now-playing" />
                    <input type="hidden" name="login" value="login" />
                    <input type="hidden" name="sid" value={sid} />
                    <div dangerouslySetInnerHTML={{__html: html}} />
                    <div className="row g-3">
                        <label className="col-4">Username:</label>
                        <div className="col-8">
                            <input type="text" name="username" value={user} required
                                   className="form-control form-control-lg"
                                   onChange={(ev) => setUser(ev.target.value)}/>
                        </div>
                    </div>
                    <div className="row g-3">
                        <label className="col-4">Password:</label>
                        <div className="col-8">
                            <input type="password" name="password" value={pwd} required
                                   className="form-control form-control-lg"
                                   onChange={(ev) => setPwd(ev.target.value)} />
                            <small>
                                <a href="//phpBB3/app.php/user/forgot_password" target="_blank">I forgot my password</a>
                            </small>
                        </div>
                    </div>
                    <div className="row g-3">
                        <label className="col-4"> </label>
                        <div className="col-8">
                            <div className="form-check form-check-inline">
                                <input type="checkbox" name="autologin" className="form-check-input" id="progulus--login-remember-me" />
                                <label className="form-check-label" htmlFor="progulus--login-remember-me">Remember Me</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <label className="col-4"> </label>
                        <div className="col-8">
                            <div className="form-check form-check-inline">
                                <input type="checkbox" name="viewonline" className="form-check-input" id="progulus--login-hide-me" />
                                <label className="form-check-label" htmlFor="progulus--login-hide-me">
                                    Hide my online status this session
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <label className="col-4"> </label>
                        <div className="col-8">
                            <input type="submit" className="btn btn-large btn-primary" value="Login" disabled={loading || !html}/>
                        </div>
                    </div>
                </form>
            </div>
            <hr />
            <h3>Register</h3>
                <p>
                    In order to login you must be registered. Registering takes only a few moments but gives you
                    increased capabilities. The board administrator may also grant additional permissions to
                    registered users. Before you register please ensure you are familiar with our terms of use and
                    related policies. Please ensure you read any forum rules as you navigate around the board.
                </p>
                <div>
                    <a href="https://progulus.com/phpBB3/ucp.php?mode=register" className="btn btn-outline-secondary">
                        Register
                    </a>
                </div>

            <div>

            </div>
        </div>

    )
}

export default LoginPage;
