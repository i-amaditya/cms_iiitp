import React from 'react';
import { Link } from 'react-router';

const InternationalTopBar = () => {
  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <div className="top-bar-left">
          <span>🏛️ Institute of National Importance</span>
          <span>🇮🇳 Ministry of Education, Govt. of India</span>
        </div>
        <div className="top-bar-right">
          <Link to="/">IIIT Pune Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default InternationalTopBar;
