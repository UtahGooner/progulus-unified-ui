import React from "react";

export interface LoadingSpinnerProps {
    loading: boolean,
    text: string,
}
const LoadingSpinner:React.FC<LoadingSpinnerProps> = ({loading, text = 'Loading...'}) => {
    if (!loading) {
        return null;
    }
    return (
        <div className="spinner-border spinner-border-sm text-secondary mx-1" role="status">
            <span className="visually-hidden">{text}</span>
        </div>
    )
}

export default LoadingSpinner;
