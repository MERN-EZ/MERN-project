import React, { useState, useEffect } from 'react';
import './Payment.scss';

const Payment = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('/assistant/users')
      .then((response) => response.json())
      .then((data) => setNames(data))
      .catch((error) => console.log(error));
  }, []);


  return (
    <div className="payment-page assistant">
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="name-box-container">
        {names.map((name, index) => (
          <div className="name-box" key={index}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
