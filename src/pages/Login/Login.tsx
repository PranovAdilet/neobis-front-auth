import React from 'react';
import image from "../../assets/images/login.png"
import { GoEye } from "react-icons/go";


const Login = () => {


    return (
        <section className="login">
            <div className="login__content">
                <div className="login__left">
                    <img className="login__left-img" src={image} alt=""/>
                    <div className="login__left-info">
                        // eslint-disable-next-line jsx-a11y/heading-has-content
                        <h2 className="login__left-title">Lorby</h2>
                        <p className="login__left-text">Твой личный репетитор</p>
                    </div>
                </div>
                <form className="login__form">
                    // eslint-disable-next-line jsx-a11y/heading-has-content
                    <h3 className="login__error">Неверный логин или пароль</h3>
                    <h2 className="login__form-title">Вэлком бэк!</h2>
                    <input placeholder="Введи туда-сюда логин" className="login__form-input" type="text"/>
                    <label className="login__form-label">
                        <input placeholder="Пароль (тоже введи)" className="login__form-input" type="password"/>
                        <span className="login__icon"><GoEye/></span>
                    </label>
                    <button className="login__form-btn">Войти</button>
                    <h4 className="login__form-text">У меня еще нет аккаунта</h4>
                </form>
            </div>
        </section>
    );
};

export default Login;