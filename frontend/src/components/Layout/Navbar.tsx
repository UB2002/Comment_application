import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">Comment App</div>
      <div className="navbar-menu">
        {user ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <button onClick={onLogout} className="nav-link logout-button">Logout</button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;