import { Link } from 'react-router-dom'
import './Navbar.css'
import { navigationLinks } from '../configs/navigation'
import logo from '../assets/logo.png'

export function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <img src={logo} alt="Vivid Tale Logo" style={{ height: '40px', marginRight: '10px' }} />
                    Vivid Tale
                </Link>
                <ul className="nav-links">
                    {navigationLinks.map((link) => (
                        <li key={link.path}>
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="nav-auth">
                    <Link to="/Login" className="nav-btn-login">Log In</Link>
                    <Link to="/SignUp" className="nav-btn-signup">Sign Up</Link>
                </div>
            </div>
        </nav>
    )
}