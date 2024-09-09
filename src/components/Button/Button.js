import React from 'react';
import './Button.scss';

const Button = ({
  text,
  variant,
  onClick,
  style,
  padding,
  margin,
  textColor,
  className, 
}) => {
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

  const buttonStyle = {
    ...style,
    padding: padding,
    margin: margin,
    color: textColor,
  };

  return (
    <button
      className={`custom-button ${getButtonClass()} ${className}`} 
      onClick={onClick}
      style={buttonStyle}
    >
      {text}
    </button>
  );
};

export default Button;
