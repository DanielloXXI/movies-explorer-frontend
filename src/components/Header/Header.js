import './Header.css'
import logo from '../../images/logo.svg';
import NavBar from '../NavBar/NavBar';
import account from '../../images/account.svg';
import { Link } from 'react-router-dom';
import burger from '../../images/burger.svg';
import PopupMenu from '../PopupMenu/PopupMenu';
import React from 'react';

function Header(props) {


    return (
        <>
            <PopupMenu isOpened={props.isPopupOpen} onClose={props.onClose}></PopupMenu>
            <header className="header">
                <Link to='/'><img src={logo} alt='Лого' className='header__logo'></img></Link>
                <NavBar></NavBar>
                <Link to='/profile' className='header__account-link'><button type='button' className='header__account'>Аккаунт <img src={account} alt='Лого аккаунт' className='header__account-logo'></img></button></Link>
                <button type='button' className='header__burger' onClick={props.onOpen}><img src={burger} alt='Лого аккаунт' className='header__burger-logo'></img></button>
            </header>
        </>
    );
}

export default Header;