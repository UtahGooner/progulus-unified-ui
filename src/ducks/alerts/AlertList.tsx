import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {dismissAlertAction, selectAlertList} from "./index";

const AlertList:React.FC = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectAlertList);

    const clickHandler = (key:string) => dispatch(dismissAlertAction(key));
    const keys = Object.keys(list);
    return (
        <>
            {keys.map(key => (
                <div key={key} className="alert alert-danger alert-dismissible">
                    <strong className="me-3">{key}</strong>
                    {list[key].message}
                    {list[key].count > 1 && (<span className="badge bg-danger ms-1">{list[key].count}</span>)}
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => clickHandler(key)}/>
                </div>
            ))}
        </>
    )
}

export default AlertList;
