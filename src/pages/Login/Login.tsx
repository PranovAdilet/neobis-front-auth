import React from 'react';
import image from "../../assets/images/login.png"
import LoginForm from "../../components/Form/LoginForm/LoginForm";



const Login = () => {


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
                <LoginForm/>
            </div>
        </section>
    );
};

export default Login;