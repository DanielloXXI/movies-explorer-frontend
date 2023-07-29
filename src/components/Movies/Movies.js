import './Movies.css';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

function Movies({ setInfoPlate, isSavedMovie, onSave, duration, onClickDeleteButton, name, posterLink, movie, savedMovies, link, onDeleteMovie }) {
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
        evt.target.parentNode.parentNode.children[1].classList.add('movies__card-save_show');
    }

    function onMouseOutPicture(evt) {
        evt.target.parentNode.parentNode.children[1].classList.remove('movies__card-save_show');
    }

    function onMouseOver(evt) {
        evt.target.parentNode.children[1].classList.remove('movies__card-save_show');
    }

    function onSaveClick(evt) {
        onSave(evt)
    }


    function onDeleteClick(evt) {
        onClickDeleteButton();
    }


    return (
        <>
            <div className='movies__card'>
                <div className='movies__card-picture' onMouseOver={onMouseOverPicture} onMouseOut={onMouseOutPicture}>
                    <a href={link}><img src={posterLink} alt={`Обложка к фильму ${name}`} className='movies__card-image'></img></a>
                    <button type='button' className={location.pathname === '/movies' ? isLiked ? 'movies__card-save movies__card-save_added' : 'movies__card-save' : 'movies__card-save movies__card-save_saved'} onClick={location.pathname === '/movies' ? !isLiked ? onSaveClick : onDeleteMovie : onDeleteClick} onMouseOver={onMouseOver}>
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