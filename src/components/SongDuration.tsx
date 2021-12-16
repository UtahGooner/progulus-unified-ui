import React from "react";
import Duration from "./Duration";

const noop = () => {};
interface SongDurationProps {
    duration: number,
    onClick?: () => void,
}

const SongDuration:React.FC<SongDurationProps> = ({duration, onClick = noop}) => {
    return (
        <span className="si--duration" onClick={onClick}><Duration duration={duration} /></span>
    )
}

export default SongDuration
