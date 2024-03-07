import React, {useState} from 'react';
import image from "../../assets/images/login.png"
import ModalLogout from "./ModalLogout/ModalLogout";


const Logged = () => {

    const [isOpen, setIsOpen] = useState(false)


    const handleClick = () => setIsOpen(true)


    return (
        <>
            <div className="logged">
                <div className="logged__content">
                    <h2 className="logged__title">С возвращением!</h2>
                    <p className="logged__text">Lorby - твой личный репетитор</p>
                    <img className="logged__img" src={image} alt=""/>
                    <button onClick={handleClick} className="logged__btn">Выйти</button>
                </div>
            </div>
            <ModalLogout isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    );
};

export default Logged;