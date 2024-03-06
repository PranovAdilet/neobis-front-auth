import React, {ChangeEvent, useState} from 'react';
import {MdArrowBackIosNew} from "react-icons/md";
import {useForgotPasswordMutation} from "../../redux/api/api";


interface IProps {
    setForgotPassword : (v: boolean) => void
}
const ForgotPassword = ({setForgotPassword} : IProps) => {

    const handleBack = () => {
        setForgotPassword(false)
    }
    // const {user} = useAppSelector(selectUser)


    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)

    const [username, setUsername] = useState('')


    const [forgotPassword] = useForgotPasswordMutation()

    const handleForgotPassword = async () => {
        const newData = {
            username,
            endpoint: "http://localhost:3000/"
        }
        await forgotPassword(newData)
    }

    return (
        <div className="login__right">
            <form className="login__form">

                <h2 className="login__form-title">Восстановление аккаунта</h2>
                <input
                    placeholder="Введите адрес электронной почты"
                    className="login__form-input"
                    type="text"
                    value={username}
                    onChange={handleChangeInput}
                />

                <button onClick={handleForgotPassword} type="button" className="login__form-btn">Далее</button>
            </form>
            <div onClick={handleBack} className="login__verification-back">
                <span className="login__verification-icon"><MdArrowBackIosNew/></span>
                <p className="login__verification-text">Назад</p>
            </div>
        </div>
    );
};

export default ForgotPassword;