import React from 'react';
import './Button.css';

const Button = ({ text, variant, onClick }) => {
    const getButtonClass = () => {
        switch (variant) {
            case 'light':
                return 'button-light';
            case 'dark':
                return 'button-dark';
            case 'white':
                return 'button-white';
            default:
                return 'button-default';
        }
    };

    return (
        <button className={`custom-button ${getButtonClass()}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
