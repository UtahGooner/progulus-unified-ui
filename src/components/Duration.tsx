import React from 'react';

export interface DurationProps {
    duration: number,
}
const Duration:React.FC<DurationProps> = ({duration}) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return (
        <>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</>
    )
}

export default Duration;
