import React from 'react';
import CustomModal from "../../Modal/Modal";
import {useNavigate} from "react-router-dom";

interface IProps{
    isOpen: boolean
    setIsOpen: (state: boolean) => void
}

const ModalResetPassword = ({isOpen, setIsOpen} : IProps) => {

    const navigate = useNavigate()

    const closeModal = () => navigate('/signIn')

    return (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="modal">
                <h2 className="modal__title">Пароль был успешно изменен!</h2>
                <div className="modal__text">Вернись к главной странице и авторизуйся!
                </div>
                <button className="modal__btn" onClick={closeModal}>Вернуться</button>
            </div>
        </CustomModal>
    );
};

export default ModalResetPassword;