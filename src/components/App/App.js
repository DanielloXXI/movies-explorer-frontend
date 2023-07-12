import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from "react";
import Main from '../Main/Main'
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import MainMovies from '../MainMovies/MainMovies';

function App() {



  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path='/signin' element={<SignIn></SignIn>}></Route>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        <Route path='/movies' element={<MainMovies></MainMovies>}></Route>
        <Route path='/saved-movies' element={<SavedMovies></SavedMovies>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
      </Routes>
    </>
  );
}

export default App;
