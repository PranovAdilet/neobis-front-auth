import React from 'react';
import image from "../../assets/images/login.png";
import {MdArrowBackIosNew} from "react-icons/md";
import RegistrationForm from "../../components/Form/RegistrationForm";


const Registration = () => {

    const handleBack = () => {
        window.history.back()
    }

    return (
        <section className="login">
            <div className="login__content">
                <div className="login__left">
                    <img className="login__left-img" src={image} alt=""/>
                    <div className="login__left-info">
                        <h2 className="login__left-title">Lorby </h2>
                        <p className="login__left-text">Твой личный репетитор</p>
                    </div>
                </div>
                <RegistrationForm/>
            </div>
            <div onClick={handleBack} className="login__verification-back">
                <span className="login__verification-icon"><MdArrowBackIosNew/></span>
                <p className="login__verification-text">Назад</p>
            </div>
        </section>
    );
};

export default Registration;