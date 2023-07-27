import './Movies.css';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

function Movies({ setInfoPlate, isSavedMovie, onSave, duration, onClickDeleteButton, name, posterLink, movie, savedMovies }) {
    const location = useLocation();
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!isSavedMovie) {
            const result = savedMovies.some((item) => (movie.id + '') === item.movieId);
            setIsLiked(result);
        }
    }, [savedMovies]);

    function onMouseOverPicture(evt) {
        evt.target.parentNode.children[1].classList.add('movies__card-save_show');
    }

    function onMouseOutPicture(evt) {
        evt.target.parentNode.children[1].classList.remove('movies__card-save_show');
    }

    function onSaveClick(evt) {

        onSave()
            .then((res) => {
                evt.target.classList.add('movies__card-save_added');
                evt.target.textContent = '';
                evt.target.setAttribute('disabled', 'disabled');
                setIsLiked(true);
            })
            .catch(err => {
                setInfoPlate({ text: err.message, status: false, opened: true })
            });
    }


    function onDeleteClick(evt) {
        onClickDeleteButton();
    }


    return (
        <>
            <div className='movies__card'>
                <div className='movies__card-picture' onMouseOver={onMouseOverPicture} onMouseOut={onMouseOutPicture}>
                    <img src={posterLink} alt={`Обложка к фильму ${name}`} className='movies__card-image'></img>
                    <button type='button' disabled={isLiked} className={location.pathname === '/movies' ? isLiked ? 'movies__card-save movies__card-save_added' : 'movies__card-save' : 'movies__card-save movies__card-save_saved'} onClick={location.pathname === '/movies' ? onSaveClick : onDeleteClick}>
                        {location.pathname === '/movies' ? isLiked ? '' : 'Сохранить' : ''}
                    </button>
                </div>
                <div className='movies__text'>
                    <p className='movies__card-name'>{name}</p>
                    <span className='movies__card-duration'>{`${hours}ч ${minutes}м`}</span>
                </div>
            </div>
        </>
    );
}

export default Movies;