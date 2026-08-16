import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">✦</span>
        <span className="brand-name">TaskFlow</span>
      </div>
      <div className="navbar-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          All Tasks
        </Link>
        <Link
          to="/add"
          className={`nav-link add-btn ${location.pathname === '/add' ? 'active' : ''}`}
        >
          + Add Task
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;