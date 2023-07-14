import './NavBar.css'
import { NavLink } from 'react-router-dom';

function NavBar(props) {


    return (
        <nav className='menu'>
            <NavLink to="/" className={({ isActive }) => `menu__link menu__link_first  ${props.class} ${isActive ? `menu__link_active` : ""}`}>Главная</NavLink>
            <NavLink to="/movies" className={({ isActive }) => `menu__link ${props.class} ${isActive ? `menu__link_active` : ""}`}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={({ isActive }) => `menu__link ${props.class} ${isActive ? `menu__link_active` : ""}`}>Сохранённые фильмы</NavLink>
        </nav>
    );
}

export default NavBar;