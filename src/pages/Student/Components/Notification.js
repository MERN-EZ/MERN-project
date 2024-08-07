import React from 'react';
import notificationData from './../Data/notificationData';
import './notification.scss';

const Notification = () => {
  return (
    <div className="notification-container">
      {notificationData.map((notification) => (
        <div key={notification.id} className="notification-item">
          <i className="notification-icon">🔊</i>
          <p>{notification.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
