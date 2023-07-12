import React from "react";
import './Main.css';
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import header__photo from "../../images/header__photo.png";
import strelka from '../../images/strelka.svg';
import Footer from '../Footer/Footer';
import { Link as LinkRoll } from 'react-scroll';


function Main() {


    return (
        <>
            <header className="main__header">
                <div className="main__border">
                    <Link to='/' className="main__header-logo_link"><img src={logo} alt="Лого" className="main__header-logo" /></Link>
                    <div className="main__header-buttons">
                        <Link to='/signup' className="main__header-registration">Регистрация</Link>
                        <Link to="/signin">
                            <button type="button" className="main__header-auth">
                                Войти
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="main__border main__border_text">
                    <div className="main__header-text">
                        <h1 className="main__header-title">Учебный проект студента факультета Веб-разработки.</h1>
                        <h3 className="main__header-subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h3>
                        <LinkRoll to="about-project__title" smooth={true} duration={400}><button type="button" className="main__header-more">Узнать больше</button></LinkRoll>
                    </div>
                    <img src={header__photo} alt="Фото планеты" className="main__header-photo" />
                </div>
            </header>
            <main className="main__main">
                <section className="about-project">
                    <div className="main__border main__border_column">
                        <h3 className="about-project__title" id={"about-project__title"}>О проекте</h3>
                        <div className="main__line"></div>
                        <div className="about-project__text">
                            <div className="about-project__levels">
                                <h4 className="about-project__subtitle">Дипломный проект включал 5 этапов</h4>
                                <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                            </div>
                            <div className="about-project__time">
                                <h4 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h4>
                                <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                            </div>
                        </div>
                        <div className="about-project__lines">
                            <div className="about-project__backend">
                                1 неделя
                            </div>
                            <div className="about-project__frontend">
                                4 недели
                            </div>
                        </div>
                        <div className="about-project__lines">
                            <p className="about-project__underline_backend">Back-end</p>
                            <p className="about-project__underline_frontend">Front-end</p>
                        </div>
                    </div>
                </section>
                <section className="technologies">
                    <div className="main__border main__border_column">
                        <h3 className="technologies__title">Технологии</h3>
                        <div className="main__line"></div>
                        <h2 className="technologies__main-title">7 технологий</h2>
                        <h4 className="technologies__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</h4>
                        <div className="technologies__tiles">
                            <div className="technologies__tile">
                                HTML
                            </div>
                            <div className="technologies__tile">
                                CSS
                            </div>
                            <div className="technologies__tile">
                                JS
                            </div>
                            <div className="technologies__tile">
                                React
                            </div>
                            <div className="technologies__tile">
                                Git
                            </div>
                            <div className="technologies__tile">
                                Express.js
                            </div>
                            <div className="technologies__tile">
                                mongoDB
                            </div>
                        </div>
                    </div>
                </section>
                <section className="student">
                    <div className="main__border main__border_column">
                        <h3 className="student__title">Студент</h3>
                        <div className="main__line"></div>
                    </div>
                    <div className="main__border main__border-person">
                        <div className="student__person">
                            <h2 className="student__name">Даниил</h2>
                            <h4 className="student__status">Фронтенд-разработчик, 18 лет</h4>
                            <p className="student__about">Я родился и живу в Архангельске, закончил колледж телекоммуникаций имени Бориса Львовича Розинга.
                                Люблю слушать музыку, играть в игры, а также ходить в зал. Прошёл курс по веб-разработке от Яндекса и радуюсь жизни.</p>
                            <a href="https://github.com/DanielloXXI?tab=repositories" target="_blank" rel="noreferrer noopener" className="student__git">Github</a>
                        </div>
                        <div className="student__image"></div>
                    </div>
                    <div className="main__border main__border_column main__border-links">
                        <h5 className="student__portfolio">Портфолио</h5>
                        <div className="student__site">
                            <h4 className="student__site-text">Статичный сайт</h4>
                            <a href="https://danielloxxi.github.io/how-to-learn/" target="_blank" rel="noreferrer noopener" className="student__link"><img src={strelka} alt="Ссылка"></img></a>
                        </div>
                        <div className="student__line">
                        </div>
                        <div className="student__site">
                            <h4 className="student__site-text">Адаптивный сайт</h4>
                            <a href="https://danielloxxi.github.io/Russian-travel/" target="_blank" rel="noreferrer noopener" className="student__link"><img src={strelka} alt="Ссылка"></img></a>
                        </div>
                        <div className="student__line">
                        </div>
                        <div className="student__site">
                            <h4 className="student__site-text">Одностраничное приложение</h4>
                            <a href="https://danielloxxi.github.io/react-mesto-auth/#/sign-in" target="_blank" rel="noreferrer noopener" className="student__link"><img src={strelka} alt="Ссылка"></img></a>
                        </div>
                    </div>
                </section>
            </main >
            <Footer></Footer>
        </>
    );
}

export default Main;