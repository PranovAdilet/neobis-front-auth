import React, {useState} from 'react';
import {MdArrowBackIosNew} from "react-icons/md";
import {useForgotPasswordMutation} from "../../redux/api/api";
import ModalForgotPassword from "./ModalForgotPassword";
import InputForgotPassword from "./InputForgotPassword";


interface IProps {
    setForgotPassword : (v: boolean) => void
}
const ForgotPassword = ({setForgotPassword} : IProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState('')

    const [forgotPassword] = useForgotPasswordMutation()

    const handleBack = () => {
        setForgotPassword(false)
    }


    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const newData = {
            username,
            endpoint: "http://localhost:3000/"
        }
        await forgotPassword(newData)

        setIsOpen(true)
        setUsername('')
    }

    return (
        <div className="login__right">
            <form onSubmit={onSubmit} className="login__form">

                <h2 className="login__form-title">Восстановление аккаунта</h2>
                <InputForgotPassword username={username} setUsername={setUsername}/>

                <button type="submit" className="login__form-btn">Отправить</button>
            </form>
            <div onClick={handleBack} className="login__verification-back">
                <span className="login__verification-icon"><MdArrowBackIosNew/></span>
                <p className="login__verification-text">Назад</p>
            </div>
            <ModalForgotPassword isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    );
};

export default ForgotPassword;