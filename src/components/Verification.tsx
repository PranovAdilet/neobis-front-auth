import React from 'react';
import image from "../assets/images/login.png";
import { MdArrowBackIosNew } from "react-icons/md";
import Modal from "./Modal";

const Verification = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <section className="login">
                <div className="login__verification-content">
                    <div className="login__left">
                        <img className="login__left-img" src={image} alt=""/>
                        <div className="login__left-info">
                            <h2 className="login__left-title">Lorby </h2>
                            <p className="login__left-text">Твой личный репетитор</p>
                        </div>
                    </div>
                    <form className="login__verification login__form">
                        <div className="login__verification-back">
                            <span className="login__verification-icon"><MdArrowBackIosNew/></span>
                            <p className="login__verification-text">Назад</p>
                        </div>
                        <h2 className="login__verification-title">Выслали письмо со ссылкой для завершения
                            регистрации на example@gmail.com
                        </h2>
                        <p className="login__text">
                            Если письмо не пришло, не спеши ждать совиную почту -
                            лучше <span className="login__text-bold">
                        проверь ящик “Спам” <br/>
                        <br/>
                        (´｡• ω •｡`)
                    </span>
                        </p>
                        <h4 onClick={openModal} className="login__form-text">Письмо не пришло</h4>
                    </form>
                </div>
            </section>
            {
                isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
            }
        </>
    );
};

export default Verification;