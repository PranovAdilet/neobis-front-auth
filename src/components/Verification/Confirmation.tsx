import React, {useEffect, useState} from 'react';
import image from "../../assets/images/login.png";
import { MdArrowBackIosNew } from "react-icons/md";
import Modal from "./Modals/ConfirmModal";
import {useResendConfirmationMutation} from "../../api/api";
import {selectUser} from "../../redux/reducers/user";
import {useSearchParams} from "react-router-dom";
import ConfirmedModal from "./Modals/ConfirmedModal";
import {useAppSelector} from "../../redux/hooks/reduxHooks";


const Confirmation = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)

    const [searchParams] = useSearchParams()

    const token = searchParams.get('ct')

    useEffect(() => {

        if (token){
            setIsConfirmed(true)
        }else {
            setIsConfirmed(false)
        }

    }, [token])

    const [mutate] = useResendConfirmationMutation()

    const {user} = useAppSelector(selectUser)


    function openModal() {
        if (user){
            mutate(user)
        }

        setIsOpen(true)
    }


    const handleBack = () => {
        window.history.back()
    }

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
            {
                isConfirmed && <ConfirmedModal token={token ?? '' } isOpen={isConfirmed} setIsOpen={setIsConfirmed}/>
            }
        </>
    );
};

export default Confirmation;