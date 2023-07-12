import './Footer.css'

function Footer() {

    return (
        <footer className="footer">
            <div className='footer__border'>
                <h5 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h5>
                <div className='footer__line'></div>
                <div className='footer__info'>
                    <p className='footer__date'>© {new Date().getFullYear()}</p>
                    <div className='footer__links'>
                        <a href='https://practicum.yandex.ru/' target="_blank" rel="noreferrer noopener" className='footer__link'>Яндекс.Практикум</a>
                        <a href='https://github.com/DanielloXXI?tab=repositories' target="_blank" rel="noreferrer noopener" className='footer__link'>Github</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;