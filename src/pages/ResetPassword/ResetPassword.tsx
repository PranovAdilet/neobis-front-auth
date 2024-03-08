import React, {useState} from 'react';
import {MdArrowBackIosNew} from "react-icons/md";
import image from "../../assets/images/login.png";
import ModalResetPassword from "../../components/ResetPassword/Modal/ModalResetPassword";
import ResetPasswordForm from "../../components/ResetPassword/Form/ResetPasswordForm";



const ResetPassword = () => {


    const [isOpen, setIsOpen] = useState(false)


    return (
        <section className="login">
            <div className="login__content">
                <div className="login__left">
                    <img className="login__left-img" src={image} alt=""/>
                    <div className="login__left-info">

                        <h2 className="login__left-title">Lorby</h2>
                        <p className="login__left-text">Твой личный репетитор</p>
                    </div>
                </div>
                <div className="login__right">
                    <ResetPasswordForm/>
                    <div className="login__verification-back">
                        <span className="login__verification-icon"><MdArrowBackIosNew/></span>
                        <p className="login__verification-text">Назад</p>
                    </div>
                </div>
            </div>
            <ModalResetPassword isOpen={isOpen} setIsOpen={setIsOpen}/>
        </section>

    );
};

export default ResetPassword;