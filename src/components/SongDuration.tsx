import React from "react";

const noop = () => {};
interface SongDurationProps {
    duration: number,
    onClick?: () => void,
}

const SongDuration:React.FC<SongDurationProps> = ({duration, onClick = noop}) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return (
        <span className="si--duration" onClick={onClick}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    )
}

export default SongDuration
