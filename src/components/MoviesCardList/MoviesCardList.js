import React, { useState, useEffect } from 'react';
import Movies from '../Movies/Movies';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ setInfoPlate, onDelete, onHandleSaveMovie, isNeedMoreButton, movies, savedMovies, onDeleteMovie }) {
    const location = useLocation();
    const [visibleMovies, setVisibleMovies] = useState(12);
    const isSavedMovie = location.pathname === '/saved-movies';

    useEffect(() => {
        let resizeTimeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const screenWidth = window.innerWidth;
                let visibleCount;
                if (screenWidth < 768) {
                    visibleCount = 5;
                    setVisibleMovies(visibleCount);
                    return;
                }
                if (screenWidth < 1280) {
                    visibleCount = 8;
                    setVisibleMovies(visibleCount);
                    return;
                } 
                else {
                    visibleCount = 12;
                    setVisibleMovies(visibleCount);
                    return;
                }
            }, 500);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLoadMore = () => { 
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 2);
            return;
        }
        if (screenWidth < 1280) {
            setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 2);
            return;
        }
        else {
            setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 3);
            return;
        }
    };

    const renderedMovies = movies.slice(0, visibleMovies);

    return (
        <>
            <div className='movies__cards'>
                {!isSavedMovie ?

                    renderedMovies.map((movie) => (

                        <Movies key={movie.id}
                            movie={movie}
                            isSavedMovie={isSavedMovie}
                            savedMovies={savedMovies}
                            name={movie.nameRU}
                            onSave={() => onHandleSaveMovie(movie)}
                            duration={movie.duration}
                            link={movie.trailerLink}
                            posterLink={`https://api.nomoreparties.co${movie.image.url}`}
                            setInfoPlate={setInfoPlate}
                            onDeleteMovie={()=> onDeleteMovie(movie)}
                        />
                    )) :

                    movies.map((movie) => (

                        <Movies key={movie._id}
                            setInfoPlate={setInfoPlate}
                            movie={movie}
                            isSavedMovie={isSavedMovie}
                            link={movie.trailerLink}
                            posterLink={movie.image}
                            onClickDeleteButton={() => onDelete(movie._id)}
                            name={movie.nameRU}
                            duration={movie.duration}
                        />
                    ))}


            </div>
            {isNeedMoreButton && movies.length > visibleMovies && (
                <div className='movies__more'>
                    <button type='button' className='movies__button-more' onClick={handleLoadMore}>Ещё</button>
                </div>
            )}
        </>
    );
}

export default MoviesCardList;