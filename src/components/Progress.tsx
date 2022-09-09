import React, {ReactNode} from "react";
import classNames from "classnames";

export interface ProgressProps {
    width?: number,
    animated?: boolean,
    style?: object,
    children?: ReactNode,
}
const Progress:React.FC<ProgressProps> = ({width = 1, animated, style= {}, children}) => {
    const className = {
        'progress-bar-animated': animated,
        'progress-bar-striped': animated,
    }
    const progressBarStyle = {
        width: `${width * 100}%`,
    }
    return (
        <div className="progress mt-1" style={style}>
            <div className={classNames('progress-bar', className)} style={progressBarStyle}>
                {!!children && (<span className="visually-hidden">{children}</span>)}
            </div>
        </div>
    )
}

export default Progress;
