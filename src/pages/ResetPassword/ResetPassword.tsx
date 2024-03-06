import React, {ChangeEvent, useState} from 'react';
import {MdArrowBackIosNew} from "react-icons/md";
import {useResetPasswordMutation} from "../../redux/api/api";
import image from "../../assets/images/login.png";
import {useSearchParams} from "react-router-dom";



const ResetPassword = () => {

    const [password, setPassword] = useState('')

    const [resetPassword, {data}] = useResetPasswordMutation()
    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const [searchParams] = useSearchParams()

    const rpt = searchParams.get('rpt')
    console.log(rpt)

    const handlePassword = async () => {
        const newData = {
            password,
            rpt: rpt ?? ''
        }

        await resetPassword(newData)
        console.log(data)
    }


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
                    <form className="login__form">

                        <h2 className="login__form-title">Восстановление пароля</h2>
                        <input
                            placeholder="Введите новый пароль"
                            className="login__form-input"
                            type="text"
                            value={password}
                            onChange={handleChangeInput}
                        />

                        <button onClick={handlePassword} type="button" className="login__form-btn">Изменить пароль
                        </button>
                    </form>
                    <div className="login__verification-back">
                        <span className="login__verification-icon"><MdArrowBackIosNew/></span>
                        <p className="login__verification-text">Назад</p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ResetPassword;