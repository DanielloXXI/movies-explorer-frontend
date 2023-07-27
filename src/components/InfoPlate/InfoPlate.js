import './InfoPlate.css';
import success from '../../images/success.svg';
import bad from '../../images/bad.svg';

function InfoPlate({ status, text, opened, onClose }) {

    return (
        <div className={opened ? 'info-plate info-plate_opened' : 'info-plate'} onClick={onClose}>
            <div className="info-plate__container">
                <img className='info-plate__icon' alt='иконка' src={status ? success : bad}></img>
                <p className="info-plate__text">{text}</p>
            </div>
        </div>
    );
}

export default InfoPlate;