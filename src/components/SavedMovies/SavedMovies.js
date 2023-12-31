import './SavedMovies.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FindForm from '../FindForm/FindForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';

function SavedMovies(props) {


    const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovie')));
    const [result, setResult] = useState(savedMovies);
    const [isResult, setIsResult] = useState(false);

    useEffect(()=> {
        props.setInfoPlate({ text: '', status: true, opened: false });
        props.setisPopupOpen(false);
    }, []);

    function handleDeleteMovie(id) {
        return mainApi.removeMovie(id)
            .then(res => {
                const updatedFilteredMovies = savedMovies.filter((movie) => movie._id !== res._id);
                const resultFilteredMovies = result.filter((movie) => movie._id !== res._id);
                setSavedMovies(updatedFilteredMovies);
                setResult(resultFilteredMovies);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSearch = (searchOptions) => {
        const { meaning, isShortFilm } = searchOptions;
        const filtered = savedMovies.filter((movie) => {
            const isIncluded = movie.nameRU.toLowerCase().includes(meaning.toLowerCase());
            const isShort = movie.duration <= 40;
            if (meaning == '') {
                return 0;
            }
            if (isShortFilm) {
                return isIncluded && isShort;
            } else {
                return isIncluded;
            }
        });

        if (filtered.length === 0) {
            setIsResult(true)
        }
        else {
            setIsResult(false)
        }
        setResult(filtered);
        
    }
    return (
        <>
            <Header onClose={props.onClose} onOpen={props.onOpen} isPopupOpen={props.isPopupOpen}></Header>
            <main className='movies'>
                <FindForm onSearch={handleSearch}
                    setInfoPlate={props.setInfoPlate}></FindForm>
                {isResult ? <span className='empty-result'>Ничего не найдено</span> : null}
                <MoviesCardList  movies={result} onDelete={handleDeleteMovie} inSaveMovies={true} isNeedMoreButton={false} setInfoPlate={props.setInfoPlate}/>
            </main>
            <Footer></Footer>

        </>
    );
}

export default SavedMovies;