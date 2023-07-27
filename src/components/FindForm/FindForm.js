import React, { useState } from 'react';
import './FindForm.css';
import search from '../../images/search.svg';
import { useLocation } from 'react-router-dom';

function FindForm({ onSearch, meaning, checkBox, setInfoPlate }) {
    const location = useLocation();
    const locationSavedMovies = location.pathname === '/saved-movies';
    const [isChecked, setIsChecked] = useState(checkBox || false);
    const [searchMeaning, setSearchMeaning] = useState(meaning || '');


    const handleCheckboxChange = (evt) => {
        setIsChecked(evt.target.checked);
        submit(evt.target.checked);
    };

    const handleInputChange = (evt) => {
        setSearchMeaning(evt.target.value);
    };
    const submit = (checked) => {
        if (locationSavedMovies) {
            const searchOptions = {
                meaning: searchMeaning,
                isShortFilm: checked,
            };
            onSearch(searchOptions);
        } else {
            (searchMeaning < 1) && setInfoPlate({ text: '«Введите ключевое слово».', status: false, opened: true })
            const searchOptions = {
                meaning: searchMeaning,
                isShortFilm: checked,
            };
            onSearch(searchOptions);
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        submit(isChecked)
    };

    return (
        <form className='movies__form' name={`auth__form`} noValidate onSubmit={handleSubmit}>
            <label className='movies__fieldset'>
                <img src={search} alt='Поиск' className='movies__search-icon'></img>
                <input type='text' name="film" className="movies__input movies__input_film" id="film" required placeholder='Фильм' onChange={handleInputChange} value={searchMeaning}>
                </input>
                <button type='submit' className='movies__button'>Найти</button>
            </label>
            <div className='movies__line'>
            </div>
            <div className='movies-form__checkbox-container'>
                <input type="checkbox" id="movies-form__checkbox" className='movies-form__checkbox' checked={isChecked} onChange={handleCheckboxChange}></input>
                <label htmlFor="movies-form__checkbox"></label>
                <p className='movies-form__checkbox-description'>Короткометражки</p>
            </div>
        </form>
    );
}

export default FindForm;
