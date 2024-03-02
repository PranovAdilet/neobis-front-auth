import React, {useEffect} from 'react';
import image from "../../assets/images/login.png";
import { MdArrowBackIosNew } from "react-icons/md";
import Modal from "./Modal";
import {saveToLocalStorage} from "../../assets/utils/confrirmationToken";
import {useConfirmationQuery, useResendConfirmationMutation} from "../../redux/api/api";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/reducers/user";


const Verification = () => {

    const [isOpen, setIsOpen] = React.useState(false)

    const [mutate] = useResendConfirmationMutation()

    const {user} = useSelector(selectUser)

    function openModal() {
        setIsOpen(true)

        if (user){
            mutate(user)
        }
    }


    const handleBack = () => {
        window.history.back()
    }

    useEffect(() => {
        saveToLocalStorage()
    }, [])


    const postToken = localStorage.getItem('registrationToken')


    const {status, data} = useConfirmationQuery(postToken ?? '')

    console.log(status, data)


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
                <div onClick={handleBack} className="login__verification-back">
                    <span className="login__verification-icon"><MdArrowBackIosNew/></span>
                    <p className="login__verification-text">Назад</p>
                </div>
            </section>
            {
                isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
            }
        </>
    );
};

export default Verification;