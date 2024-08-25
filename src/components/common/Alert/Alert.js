import React from 'react';
import './Alert.css';

const Alert = ({ message, onConfirm, onCancel, variant }) => {
  return (
    <div className="alert">
      <div className="alert-content">
        <p>{message}</p>
        {variant === 'action' ? (
          <>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={onCancel}>Close</button>
        )}
      </div>
    </div>
  );
};

export default Alert;
