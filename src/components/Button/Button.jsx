import React from 'react';
import "./button.scss";

const Button = (props) => {
    return (
        <button onClick={props.handleClick} >
            {props.text}
        </button>
    )
}

export default Button