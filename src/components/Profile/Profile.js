import './Profile.css'
import Header from '../Header/Header';
import { useState } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from 'react';
import { EMAIL_CHECKER } from '../../constants/constants';

function Profile(props) {

    const [formValue, setFormValue] = useState({});
    const [formErrorMessage, setFormErrorMessage] = useState({});
    const isFormFieldsValid = !formErrorMessage.name && !formErrorMessage.email && !formValue.name == '' && !formValue.email == '';
    const [buttonStatus, setButtonStatus] = useState(null);
    const currentUser = React.useContext(CurrentUserContext);
    const { name, email } = currentUser;

    React.useEffect(() => {
        props.setInfoPlate({ text: '', status: true, opened: false });
        props.setisPopupOpen(false);
    }, []);

    React.useEffect(() => {
        setFormValue({
            name: currentUser.name,
            email: currentUser.email
        });
    }, [currentUser]);

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

        if (value.length > 0) {
            const isValid = EMAIL_CHECKER.test(value);
            setFormErrorMessage({
                ...formErrorMessage,
                [name]: isValid ? '' : 'Некорректный формат email'
            });
        }
    }

    function editForm(evt) {
        evt.target.classList.toggle('profile__edit-button_hidden');
        document.querySelector('.profile__exit-button').classList.toggle('profile__exit-button_hidden');
        document.querySelectorAll('.profile__input').forEach(element => {
            element.removeAttribute('disabled');
        }
        );
        setButtonStatus(true);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: formValue.name,
            email: formValue.email,
        });
        document.querySelector('.profile__edit-button').classList.toggle('profile__edit-button_hidden');
        setButtonStatus(null);
        document.querySelector('.profile__exit-button').classList.toggle('profile__exit-button_hidden');
        document.querySelectorAll('.profile__input').forEach(element => {
            element.setAttribute('disabled', 'disabled');
        }
        );
    }

    return (
        <>
            <Header onClose={props.onClose} onOpen={props.onOpen} isPopupOpen={props.isPopupOpen}></Header>
            <main className='profile'>
                <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                <form className={`profile__form`} name={`profile__form`} onSubmit={handleSubmit}>
                    <label className="profile__fieldset">
                        <span className='profile__input-text profile__input-text_name'>Имя</span>
                        <input type="text" name="name" className="profile__input profile__input_name"
                            id="name" minLength="2" maxLength="20" required placeholder='Имя' onChange={handleChangeName} disabled value={formValue.name || ""} />
                    </label>
                    <span className={((formErrorMessage.name === undefined) || (formErrorMessage.name === '')) ? 'profile__input-error_invisible' : 'profile__input-error'}>{formErrorMessage.name || ''}</span>
                    <div className='profile__line'>

                    </div>
                    <label className="profile__fieldset">
                        <span className='profile__input-text'>E-mail</span>
                        <input type="email" name="email" className="profile__input profile__input_email"
                            id="email" minLength="6" maxLength="40" required placeholder='Почта' onChange={handleChangeEmail} disabled value={formValue.email || ""} />
                    </label>
                    <span className={((formErrorMessage.email === undefined) || (formErrorMessage.email === '')) ? 'profile__input-error_invisible' : 'profile__input-error profile__input-error_margin'}>{formErrorMessage.email || ''}</span>
                    <button type='button' className='profile__edit-button' onClick={editForm}>Редактировать</button>
                    <button type="submit" className={buttonStatus === (null) ? 'profile__submit-button' : (formValue.email == email && formValue.name == name) ? 'profile__submit-button profile__submit-button_showed profile__submit-button_disabled' : isFormFieldsValid ? 'profile__submit-button profile__submit-button_showed' : 'profile__submit-button profile__submit-button_showed profile__submit-button_disabled'} disabled={(!isFormFieldsValid) || (formValue.email == email && formValue.name == name)}>Сохранить</button>
                </form>
                <button type='button' className='profile__exit-button' onClick={props.goExit}>
                    Выйти из аккаунта
                </button>
            </main>
        </>
    );
}

export default Profile;