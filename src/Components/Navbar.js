import { Link } from 'react-router-dom'
import './Navbar.css'
import { navigationLinks } from '../configs/navigation'

export function Navbar() {
    return (
        <nav className="navbar">
            <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
                {navigationLinks.map((link) => (
                    <li key={link.path}>
                        <Link to={link.path}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}