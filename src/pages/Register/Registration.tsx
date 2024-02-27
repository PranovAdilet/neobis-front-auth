import React from 'react';
import image from "../../assets/images/login.png";
import {GoEye} from "react-icons/go";

const Registration = () => {
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
                <form className="login__form">
                    <h2 className="login__form-title">Создать аккаунт Lorby</h2>
                    <input placeholder="Введи адрес почты" className="login__form-input" type="email"/>
                    <input placeholder="Придумай логин" className="login__form-input" type="text"/>
                    <label className="login__form-label">
                        <input placeholder="Создай пароль" className="login__form-input" type="password"/>
                        <span className="login__icon"><GoEye/></span>
                    </label>
                    <label className="login__form-label">
                        <input placeholder="Повтори пароль" className="login__form-input" type="password"/>
                        <span className="login__icon"><GoEye/></span>
                    </label>
                    <button className="login__form-btn">Далее</button>
                </form>
            </div>
        </section>
    );
};

export default Registration;