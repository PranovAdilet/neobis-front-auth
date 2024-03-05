import React from 'react';
import {MdArrowBackIosNew} from "react-icons/md";


interface IProps {
    setForgotPassword : (v: boolean) => void
}
const ForgotPassword = ({setForgotPassword} : IProps) => {

    const handleBack = () => {
        setForgotPassword(false)
    }

    return (
        <div className="login__right">
            <form className="login__form">

                <h2 className="login__form-title">Восстановление аккаунта</h2>
                <input
                    placeholder="Введите адрес электронной почты"
                    className="login__form-input"
                    type="text"
                />

                <button type="submit" className="login__form-btn">Далее</button>
            </form>
            <div onClick={handleBack} className="login__verification-back">
                <span className="login__verification-icon"><MdArrowBackIosNew/></span>
                <p className="login__verification-text">Назад</p>
            </div>
        </div>
    );
};

export default ForgotPassword;