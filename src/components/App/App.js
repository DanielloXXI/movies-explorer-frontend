import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import React from "react";
import Main from '../Main/Main'
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import InfoPlate from '../InfoPlate/InfoPlate';
import MainMovies from '../MainMovies/MainMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Navigate } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [infoPlate, setInfoPlate] = React.useState({ text: '', status: true, opened: false });
  const location = useLocation();
  const navigate = useNavigate();
  const [isPopupOpen, setisPopupOpen] = React.useState(false);

  React.useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, [isLoggedIn]);

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        // проверим токен
        mainApi.tokenValidity()
          .then((res) => {
            if (res) {
              // авторизуем пользователя
              setIsLoggedIn(true);
              mainApi.getInfoAboutUser()
                .then((res) => {
                  setCurrentUser(res.data);
                })
                .catch((err) => {
                  console.log(`Ошибка ${err}`);
                });
              if (location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/' || location.pathname === '/profile' || location.pathname === '/signup' || location.pathname === '/signin') {
                navigate(location);
              }
            }
            return res;
          })
          .catch(err => {
            console.log(err);
          });
      }
      // здесь будем проверять токен
    }
  }

  function onOpen() {
    setisPopupOpen(true);
  }

  function onClose() {
    setisPopupOpen(false);
  }

  async function handleRegistrationUser(props) {
    return mainApi.signUp(props.password, props.email, props.name)
      .then((response) => {
        try {
          if (response.status === 200) {
            return response.json();
          }
        } catch (e) {
          return (e)
        }
      })
      .catch((err) => {
        setInfoPlate({ text: err.message, status: false, opened: true });
      })
  }

  function closeInfoPlate() {
    setInfoPlate({ opened: false });
  }

  async function handleLoginUser(props) {
    return mainApi.signIn(props.password, props.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          props.setFormValue({ username: '', password: '' });
          navigate('/movies', { replace: true });
          setInfoPlate({ text: 'Успешно', status: true, opened: true });
          return data;
        }
      })
      .catch((err) => {
        setInfoPlate({ text: err.message, status: false, opened: true });
      })
  }

  function goExit() {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate(`/`, { replace: true });
  }

  function handleUpdateUser(props) {
    mainApi.setInfoAboutUser(props.name, props.email)
      .then((res) => {
        setCurrentUser(res);
        setInfoPlate({ text: 'Успешно', status: true, opened: true });
      })
      .catch((err) => {
        setInfoPlate({ text: err.message, status: false, opened: true });
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/signup" element={isLoggedIn ? <Navigate to='/' replace /> : <SignUp onRegistrationUser={handleRegistrationUser} onLoginUser={handleLoginUser} setInfoPlate={setInfoPlate}></SignUp>}></Route>
        <Route path='/signin' element={isLoggedIn ? <Navigate to='/' replace /> : <SignIn onAuthUser={handleLoginUser} setInfoPlate={setInfoPlate}></SignIn>}></Route>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} onClose={onClose} onOpen={onOpen} isPopupOpen={isPopupOpen} setisPopupOpen={setisPopupOpen} setInfoPlate={setInfoPlate}></Main>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        <Route path='/movies' element={<ProtectedRoute element={MainMovies} isLoggedIn={isLoggedIn} setInfoPlate={setInfoPlate} onClose={onClose} onOpen={onOpen} isPopupOpen={isPopupOpen} setisPopupOpen={setisPopupOpen}></ProtectedRoute>}></Route>
        <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} setInfoPlate={setInfoPlate} onClose={onClose} onOpen={onOpen} isPopupOpen={isPopupOpen} setisPopupOpen={setisPopupOpen}></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} goExit={goExit} onUpdateUser={handleUpdateUser} setInfoPlate={setInfoPlate} onClose={onClose} onOpen={onOpen} isPopupOpen={isPopupOpen} setisPopupOpen={setisPopupOpen}></ProtectedRoute>}></Route>
      </Routes>
      <InfoPlate text={infoPlate.text} status={infoPlate.status} opened={infoPlate.opened} onClose={closeInfoPlate} />
    </CurrentUserContext.Provider>
  );
}

export default App;
