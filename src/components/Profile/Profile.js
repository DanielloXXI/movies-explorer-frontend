import './Profile.css'
import Header from '../Header/Header';
import { useState } from 'react';

function Profile(props) {

    const [formValue, setFormValue] = useState({});
    const [formErrorMessage, setFormErrorMessage] = useState({});
    const isFormFieldsValid = !formErrorMessage.name && !formErrorMessage.email && !formValue.name == '' && !formValue.email == '';
    const [buttonStatus, setButtonStatus] = useState(null);

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

    function editForm(evt) {
        evt.target.classList.add('profile__edit-button_hidden');
        setButtonStatus(true);
        document.querySelector('.profile__exit-button').classList.add('profile__exit-button_hidden');
        document.querySelectorAll('.profile__input').forEach(element => {
            element.removeAttribute('disabled');
        }
        );
    }

    return (
        <>
            <Header></Header>
            <main className='profile'>
                <h1 className='profile__title'>Привет, Виталий!</h1>
                <form className={`profile__form`} name={`profile__form`}>
                    <label className="profile__fieldset">
                        <span className='profile__input-text profile__input-text_name'>Имя</span>
                        <input type="text" name="name" className="profile__input profile__input_name"
                            id="name" minLength="2" maxLength="20" required placeholder='Имя' onChange={handleChangeName} disabled />
                    </label>
                    <span className={((formErrorMessage.name === undefined) || (formErrorMessage.name === '')) ? 'profile__input-error_invisible' : 'profile__input-error'}>{formErrorMessage.name || ''}</span>
                    <div className='profile__line'>

                    </div>
                    <label className="profile__fieldset">
                        <span className='profile__input-text'>E-mail</span>
                        <input type="email" name="email" className="profile__input profile__input_email"
                            id="email" minLength="6" maxLength="40" required placeholder='Почта' onChange={handleChangeEmail} disabled />
                    </label>
                    <span className={((formErrorMessage.email === undefined) || (formErrorMessage.email === '')) ? 'profile__input-error_invisible' : 'profile__input-error profile__input-error_margin'}>{formErrorMessage.email || ''}</span>
                    <button type='button' className='profile__edit-button' onClick={editForm}>Редактировать</button>
                    <button type="submit" className={buttonStatus === null ? 'profile__submit-button' : isFormFieldsValid ? 'profile__submit-button profile__submit-button_showed' : 'profile__submit-button profile__submit-button_showed profile__submit-button_disabled'} disabled={!isFormFieldsValid}>Сохранить</button>
                </form>
                <button type='button' className='profile__exit-button'>
                    Выйти из аккаунта
                </button>
            </main>
        </>
    );
}

export default Profile;