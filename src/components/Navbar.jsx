import '../styles/Navbar.scss';
import { NavLink, Link } from 'react-router-dom';
import { Icons } from '../icons/Icons.jsx';

export const Navbar = () => {
    return (
        <div className='nav-wrapper'>
            <nav className="navbar">
                <div className='brand'>
                    <p>Weather App</p>
                </div>
                <div className='nav-links'>
                    <NavLink to='/' end className={({ isActive }) => isActive ? 'link active' : 'link'}>Home</NavLink>
                    <NavLink to='/about' className={({ isActive }) => isActive ? 'link active' : 'link'}>About</NavLink>
                </div>
                <div className='social-media-icons'>
                    <div className='social-icon'><Link to="https://github.com">{Icons.github}</Link></div>
                    <div className='social-icon'><Link to="https://linkedin.com">{Icons.linkedin}</Link></div>
                </div>
            </nav>
        </div>
    )
};