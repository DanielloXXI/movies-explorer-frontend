import './SignIn.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { EMAIL_CHECKER } from '../../constants/constants';

function SignIn(props) {
    const [formValue, setFormValue] = useState({});
    const [formErrorMessage, setFormErrorMessage] = useState({});
    const isFormFieldsValid = !formErrorMessage.email && !formErrorMessage.password && !formValue.email == '' && !formValue.password == '';

    function handleChangeEmail(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });

        if (value.length > 0) {
            const isValid = EMAIL_CHECKER.test(value);
            setFormErrorMessage({
                ...formErrorMessage,
                [name]: isValid ? '' : 'Некорректный формат email'
            });
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAuthUser({
            email: formValue.email,
            password: formValue.password,
            setFormValue: setFormValue
        });
        // здесь обработчик регистрации
    }

    return (
        <div className="auth__border">
            <Link to='/' className='auth__logo'><img src={logo} alt='Лого'></img></Link>
            <h1 className='auth__title'>
                Рады видеть!
            </h1>
            <form className={`auth__form`} name={`auth__form`} onSubmit={handleSubmit}>
                <label className="auth__fieldset">
                    <span className='auth__input-text auth__input-text_email'>Почта</span>
                    <input type="email" name="email" className="auth__input auth__input_email"
                        id="email" minLength="2" maxLength="40" required placeholder='Почта' onChange={handleChangeEmail} />
                    <span className={((formErrorMessage.email === undefined) || (formErrorMessage.email === '')) ? 'auth__input-error_invisible' : 'auth__input-error'}>{formErrorMessage.email || ''}</span>
                </label>
                <label className="auth__fieldset">
                    <span className='auth__input-text'>Пароль</span>
                    <input type="password" name="password" className="auth__input auth__input_password"
                        id="password" minLength="8" maxLength="50" required placeholder='Пароль' onChange={handleChangePassword} />
                    <span className={((formErrorMessage.password === undefined) || (formErrorMessage.password === '')) ? 'auth__input-error_invisible' : 'auth__input-error'}>{formErrorMessage.password || ''}</span>
                </label>
                <button type="submit" className={isFormFieldsValid ? 'auth__submit-button_signin' : 'auth__submit-button_signin auth__submit-button_signin_disabled'} disabled={!isFormFieldsValid}>Войти</button>
            </form>
            <div className='auth__text'>
                <p className='auth__paragraph'>Ещё не зарегистрированы?</p>
                <Link to='/signup' className='auth__link'>Регистрация</Link>
            </div>
        </div>
    );
}

export default SignIn;