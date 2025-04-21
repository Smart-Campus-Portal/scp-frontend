import React from 'react';
import './Header.css'; 
import { Link} from 'react-router-dom';// optional for styling

const Header = () => {
  return (
  
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
          <nav className="header-nav">
            <ul>
              <li>
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              <li>
                <Link to="/settings" className="nav-link">Settings</Link>
              </li>
              <li>
                <Link to="/logout" className="nav-link">Logout</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>



  );
};

export default Header;
