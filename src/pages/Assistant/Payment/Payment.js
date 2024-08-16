import React, { useState, useEffect } from 'react';
import './Payment.scss';

const Payment = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for name boxes
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('/assistant/users')
      .then((response) => response.json())
      .then((data) => setNames(data))
      .catch((error) => console.log(error));
  }, []);

  // Filter names based on the search query
  // const filteredNames = names.filter((name) =>
  //   name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="payment-page assistant">
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Name Box Container */}
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
