import './Movies.css';
import React from 'react';
import { useLocation } from "react-router-dom";
import CardImage from '../../images/card__image.png';

function Movies(props) {
    const location = useLocation();

    function onMouseOverPicture(evt) {
        evt.target.parentNode.children[1].classList.add('movies__card-save_show');
    }

    function onMouseOutPicture(evt) {
        evt.target.parentNode.children[1].classList.remove('movies__card-save_show');
    }

    function onSaveClick(evt) {
        evt.target.classList.add('movies__card-save_added');
        evt.target.textContent = '';
        evt.target.setAttribute('disabled', 'disabled');
    }

    function onDeleteClick(evt) {
        // Добавлю позже, когда сделаю функционал...
    }

    return (
        <>
            <div className='movies__card'>
                <div className='movies__card-picture' onMouseOver={onMouseOverPicture} onMouseOut={onMouseOutPicture}>
                    <img src={CardImage} alt='123' className='movies__card-image'></img>
                    <button type='button' className={location.pathname === '/movies' ? 'movies__card-save' : 'movies__card-save movies__card-save_saved'} onClick={location.pathname === '/movies' ? onSaveClick : onDeleteClick}>
                        {location.pathname === '/movies' ? 'Сохранить' : ''}
                    </button>
                </div>
                <div className='movies__text'>
                    <p className='movies__card-name'>33 слова о дизайне</p>
                    <span className='movies__card-duration'>1ч 17м</span>
                </div>
            </div>
        </>
    );
}

export default Movies;