import './MainMovies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import FindForm from '../FindForm/FindForm';
import mainApi from '../../utils/MainApi';
import { getInitialMovies } from '../../utils/MoviesApi';


function MainMovies(props) {
    const [beatMovies, setBeatMovies] = useState([]);
    const [preloader, setPreloader] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isResult, setResult] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);


    useEffect(() => {
        props.setisPopupOpen(false);
        props.setInfoPlate({ text: '', status: true, opened: false });
        getAllMovies();
        getSavedMovies();
    }, []);

    function getSavedMovies() {
        return mainApi.getInitialMovie()
            .then(res => {
                setPreloader(true);
                setSavedMovies(res);
                localStorage.setItem('savedMovie', JSON.stringify(res));
            })
            .catch(err => {
                props.setInfoPlate({ text: err.message, status: false, opened: true });
            })
            .finally(() => setPreloader(false))
    }

    function handleDeleteMovie(movie) {
        const removeMovie = savedMovies.find((item) => (movie.id + '') === item.movieId)
        return mainApi.removeMovie(removeMovie._id)
            .then(res => {
                const newArr = savedMovies.filter((item) => item._id !== removeMovie._id)
                setSavedMovies(newArr);
            })
            .catch(err => props.setInfoPlate({ text: err.message, statusOk: false, opened: true }))
    }

    function getAllMovies() {
        return getInitialMovies()
            .then(res => {
                setPreloader(true);
                setBeatMovies(res);
                localStorage.setItem('allMovies', JSON.stringify(res));
            })
            .catch(err => props.setInfoPlate({ text: err.message, status: false, opened: true }))
            .finally(() => setPreloader(false))
    }

    const handleSearch = (searchOptions) => {
        localStorage.setItem('searchOptions', JSON.stringify(searchOptions))
        const { meaning, isShortFilm } = searchOptions;
        const filtered = beatMovies.filter((movie) => {
            const isIncluded = movie.nameRU.toLowerCase().includes(meaning.toLowerCase());
            const isShort = movie.duration <= 40;
            if (meaning == '') {
                return 0;
            }
            if (isShortFilm) {
                return isIncluded && isShort;
            } 
            else {
                return isIncluded;
            }
        });

        if (filtered.length === 0) {
            console.log(isResult);
            setResult(true);
        }
        else {
            setResult(false);
        }
        localStorage.setItem('searchResult', JSON.stringify(filtered));
        setFilteredMovies(filtered);
    }

    function handleSaveMovie(movie) {
        return mainApi.addMovie(movie)
            .then(res => {
                setSavedMovies(info => [...info, res])
            })
            .catch(err => props.setInfoPlate({ text: err.message, status: false, opened: true }))
    }

    useEffect(() => {
        localStorage.setItem('savedMovie', JSON.stringify(savedMovies))
    }, [savedMovies])

    const searchOptions = JSON.parse(localStorage.getItem('searchOptions')) || {};
    const meaning = searchOptions.meaning || '';
    const isShortFilm = searchOptions.isShortFilm || false;

    return (
        <>
            <Header onClose={props.onClose} onOpen={props.onOpen} isPopupOpen={props.isPopupOpen}></Header>
            <main className='movies'>
                <FindForm onSearch={handleSearch}
                    meaning={meaning}
                    checkBox={isShortFilm}
                    setInfoPlate={props.setInfoPlate}></FindForm>
                {isResult && <span className='empty-result'>Ничего не найдено</span>}
                {preloader && <Preloader />}
                <MoviesCardList
                    movies={JSON.parse(localStorage.getItem('searchResult')) || filteredMovies}
                    savedMovies={savedMovies}
                    isNeedMoreButton={true}
                    onHandleSaveMovie={handleSaveMovie}
                    onDeleteMovie={handleDeleteMovie}
                    setInfoPlate={props.setInfoPlate} />
            </main>
            <Footer></Footer>

        </>
    );
}

export default MainMovies;