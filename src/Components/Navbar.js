import { Link } from 'react-router-dom'
import './Navbar.css'

export function Navbar() {
    return (
        <div className="navbar">
            <li>
                <Link to='/'>
                    Home
                </Link>
            </li>
            <li>
                <Link to='/Novel'>
                    Novel
                </Link>
            </li>
            <li>
                <Link to='/Comic'>
                    Comic
                </Link>
            </li>
            <li>
                <Link to='/Testing'>
                    Testings
                </Link>
            </li>
        </div>
    )
}