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

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [infoPlate, setInfoPlate] = React.useState({ text: '', status: true, opened: false });
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, []);

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
              navigate(location);
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

  function handleRegistrationUser(props) {
    mainApi.signUp(props.password, props.email, props.name)
      .then((response) => {
        try {
          if (response.status === 200) {
            return response.json();
          }
        } catch (e) {
          return (e)
        }
      })
      .then((res) => {
        navigate('/signin', { replace: true });
        setInfoPlate({ text: 'Успешно', status: true, opened: true });
      })
      .catch((err) => {
        setInfoPlate({ text: err.message, status: false, opened: true });
      })
  }

  function closeInfoPlate() {
    setInfoPlate({ opened: false });
  }

  function handleLoginUser(props) {
    mainApi.signIn(props.password, props.email)
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
    setIsLoading(true);
    mainApi.setInfoAboutUser(props.name, props.email)
      .then((res) => {
        setCurrentUser(res);
        setInfoPlate({ text: 'Успешно', status: true, opened: true });
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setInfoPlate({ text: err.message, status: false, opened: true });
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/signup" element={<SignUp onRegistrationUser={handleRegistrationUser}></SignUp>}></Route>
        <Route path='/signin' element={<SignIn onAuthUser={handleLoginUser}></SignIn>}></Route>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn}></Main>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        <Route path='/movies' element={<ProtectedRoute element={MainMovies} isLoggedIn={isLoggedIn} setInfoPlate={setInfoPlate}></ProtectedRoute>}></Route>
        <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} setInfoPlate={setInfoPlate}></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} goExit={goExit} onUpdateUser={handleUpdateUser}></ProtectedRoute>}></Route>
      </Routes>
      <InfoPlate text={infoPlate.text} status={infoPlate.status} opened={infoPlate.opened} onClose={closeInfoPlate} />
    </CurrentUserContext.Provider>
  );
}

export default App;
