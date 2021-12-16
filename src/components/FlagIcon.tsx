import React from "react";
import classNames from "classnames";

export interface FlagIconProps {
    countryCode: string,
    square?: boolean,
}

const FlagIcon:React.FC<FlagIconProps> = ({countryCode, square}) => {
    const className = classNames({
        'ms-3': true,
        'flag-icon': true,
        [`flag-icon-${countryCode.toLocaleLowerCase()}`]: !!countryCode,
        'flag-icon-squared': square,
    })

    return (
        <span className={className} />
    )
}

export default FlagIcon;
