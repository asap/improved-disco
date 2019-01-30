import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Home
      </Link>
      <Link to="/poll" className="item">
        Poll
      </Link>
      <Link to="/results" className="item">
        Results
      </Link>
      <Link to="/admin" className="item">
        Admin
      </Link>
    </div>
  );
};

export default Header;
