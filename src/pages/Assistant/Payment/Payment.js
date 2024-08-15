import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for name boxes
  const names = [
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
    'Emily Davis',
    'Robert Brown',
    'Sarah Wilson',
    'David Lee',
    'Laura Taylor',
    // Add more names as needed
  ];

  // Filter names based on the search query
  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="payment-page">
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
        {filteredNames.map((name, index) => (
          <div className="name-box" key={index}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
