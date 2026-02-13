import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    ✍️ BlogSpace
                </Link>

                <div className="navbar-links">
                    {user ? (
                        <div className="navbar-user">
                            <span>Welcome, <span className="navbar-username">{user.username}</span></span>
                            <Link to="/dashboard" className="btn btn-ghost btn-sm">
                                Dashboard
                            </Link>
                            <Link to="/add-blog" className="btn btn-primary btn-sm">
                                + Add Blog
                            </Link>
                            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
