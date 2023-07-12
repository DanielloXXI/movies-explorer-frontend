import './PopupMenu.css'
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import account from '../../images/account.png';
import X from '../../images/X.svg';

function PopupMenu(props) {


    return (
        <section className={props.isOpened ? `popup popup_opened` : `popup`}>
            <div className='popup__container'>
                <button type="button" className='popup__close-button' onClick={props.onClose}><img src={X} alt='Закрыть'></img></button>
                <NavBar class='menu__link_active-popup'></NavBar>
                <Link to='/profile' className={`popup__account-link`}><button type='button' className='popup__account'>Аккаунт <img src={account} alt='Лого аккаунт' className='popup__account-logo'></img></button></Link>
            </div>
        </section>

    );
}

export default PopupMenu;