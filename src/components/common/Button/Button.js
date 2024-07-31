import React from 'react';
import './Button.css';

const Button = ({ text, variant, onClick }) => {
    const getButtonClass = () => {
        switch (variant) {
            case 'secondary':
                return 'button-secondary';
            case 'primary':
                return 'button-primary';
            case 'alt':
                return 'button-alt';
            default:
                return 'button-primary';
        }
    };

    return (
        <button className={`custom-button ${getButtonClass()}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
