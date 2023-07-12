import './MainMovies.css';
import Movies from '../Movies/Movies';
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import search from '../../images/search.png';

function MainMovies(props) {

    return (
        <>
            <Header></Header>
            <main className='movies'>
                <form className='movies__form' name={`auth__form`} noValidate>
                    <label className='movies__fieldset'>
                        <img src={search} alt='Поиск' className='movies__search-icon'></img>
                        <input type='text' name="film" className="movies__input movies__input_film" id="film" required placeholder='Фильм'>
                        </input>
                        <button type='submit' className='movies__button'>Найти</button>
                    </label>
                    <div className='movies__line'>
                    </div>
                    <div className='search-form__checkbox-container'>
                        <input type="checkbox" id="search-form__checkbox" className='search-form__checkbox'></input>
                        <label htmlFor="search-form__checkbox"></label>
                        <p className='search-form__checkbox-description'>Короткометражки</p>
                    </div>
                </form>
                <div className='movies__cards'>
                    <Movies></Movies>
                    <Movies></Movies>
                    <Movies></Movies>
                    <Movies></Movies>
                    <Movies></Movies>
                    <Movies></Movies>
                </div>
                <div className='movies__more'>
                    <button type='button' className='movies__button-more'>Ещё</button>
                </div>
            </main>
            <Footer></Footer>

        </>
    );
}

export default MainMovies;