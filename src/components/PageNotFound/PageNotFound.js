import './PageNotFound.css';
import { useNavigate } from "react-router-dom";
import React from 'react';


function PageNotFound(props) {


    let navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="page-not-found">
            <div className='page-not-found__text'>
                <h1 className="page-not-found__title">404</h1>
                <h2 className="page-not-found__subtitle">Страница не найдена</h2>
            </div>
            <button className='page-not-found__button' onClick={goBack}>Назад</button>
        </div>
    );
}

export default PageNotFound;