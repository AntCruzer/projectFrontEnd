import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-brand">ReelRemind</h2>

      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Home
          </NavLink>
        </li>

        {!token && (
          <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Register
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Login
              </NavLink>
            </li>
          </>
        )}

        {token && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <button type="button" className="signout-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;