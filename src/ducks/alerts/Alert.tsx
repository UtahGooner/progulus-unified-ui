import React from "react";
import {Alert, dismissAlertAction} from "./index";
import {useAppDispatch} from "../../app/configureStore";


const Alert: React.FC<{ alert: Alert }> = ({alert}) => {
    const dispatch = useAppDispatch();
    const clickHandler = (key: string) => dispatch(dismissAlertAction(key));

    return (
        <div className="alert alert-danger alert-dismissible">
            <strong className="me-3">{alert.name}</strong>
            {alert.message}
            {(alert.count??0 > 1) && (<span className="badge bg-danger ms-1">{alert.count}</span>)}
            <button type="button" className="btn-close" aria-label="Close" onClick={() => clickHandler(alert.name)}/>
        </div>
    )
}

export default Alert;
