import React, {ChangeEvent} from "react";
import classNames from "classnames";

export interface FilterToggleButtonProps {
    className: string,
    text: string,
    checked: boolean,
    onClick: () => void,
}

const FilterToggleButton:React.FC<FilterToggleButtonProps> = ({className, text, checked, onClick}) => {
    const buttonClassName = classNames(className, {
        'btn': true,
        'btn-secondary': checked,
        'btn-outline-secondary': !checked,
    });
    return (
        <button className={buttonClassName} type="button" onClick={onClick} title={text}>
            <span className="visually-hidden">{text}</span>
        </button>
    )
}

export default FilterToggleButton;
