import './SignUp.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignUp(props) {

    const [formValue, setFormValue] = useState({});
    const [formErrorMessage, setFormErrorMessage] = useState({});
    const isFormFieldsValid = !formErrorMessage.name && !formErrorMessage.email && !formErrorMessage.password && !formValue.name == '' && !formValue.email == '' && !formValue.password == '';

    function handleChangeName(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });

        setFormErrorMessage({
            ...formErrorMessage,
            [name]: e.target.validationMessage
        })
    }

    function handleChangeEmail(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });

        setFormErrorMessage({
            ...formErrorMessage,
            [name]: e.target.validationMessage
        })
    }

    function handleChangePassword(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });

        setFormErrorMessage({
            ...formErrorMessage,
            [name]: e.target.validationMessage
        })
    }

    return (
        <div className="auth__border">
            <Link to='/' className='auth__logo'><img src={logo} alt='Лого'></img></Link>
            <h1 className='auth__title'>
                Добро пожаловать!
            </h1>
            <form className={`auth__form`} name={`auth__form`}>
                <label className="auth__fieldset">
                    <span className='auth__input-text auth__input-text_name'>Имя</span>
                    <input type="text" name="name" className="auth__input auth__input_name" id="name" minLength="2"
                        maxLength="16" required placeholder='Имя' onChange={handleChangeName} />
                    <span className={((formErrorMessage.name === undefined) || (formErrorMessage.name === '')) ? 'auth__input-error_invisible' : 'auth__input-error'}>{formErrorMessage.name || ''}</span>
                </label>
                <label className="auth__fieldset">
                    <span className='auth__input-text'>Почта</span>
                    <input type="email" name="email" className="auth__input auth__input_email"
                        id="email" minLength="2" maxLength="40" required placeholder='Почта' onChange={handleChangeEmail} />
                    <span className={((formErrorMessage.email === undefined) || (formErrorMessage.email === '')) ? 'auth__input-error_invisible' : 'auth__input-error'}>{formErrorMessage.email || ''}</span>
                </label>
                <label className="auth__fieldset">
                    <span className='auth__input-text auth__input-text_password'>Пароль</span>
                    <input type="password" name="password" className="auth__input auth__input_password"
                        id="password" minLength="8" maxLength="50" required placeholder='Пароль' onChange={handleChangePassword} />
                    <span className={((formErrorMessage.password === undefined) || (formErrorMessage.password === '')) ? 'auth__input-error_invisible' : 'auth__input-error'}>{formErrorMessage.password || ''}</span>
                </label>
                <button type="submit" className={isFormFieldsValid ? 'auth__submit-button' : 'auth__submit-button auth__submit-button_disabled'} disabled={!isFormFieldsValid}>Зарегистрироваться</button>
            </form>
            <div className='auth__text'>
                <p className='auth__paragraph'>Уже зарегистрированы?</p>
                <Link to='/signin' className='auth__link'>Войти</Link>
            </div>
        </div>
    );
}

export default SignUp;