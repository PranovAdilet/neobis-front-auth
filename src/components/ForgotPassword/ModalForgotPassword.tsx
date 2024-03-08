import React from 'react';
import CustomModal from "../Modal/Modal";

interface IProps{
    isOpen: boolean
    setIsOpen: (state: boolean) => void
}

const ModalForgotPassword = ({isOpen, setIsOpen} : IProps) => {

    const closeModal = () => setIsOpen(false)

    return (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="modal">
                <h2 className="modal__title">Мы выслали письмо на твою почту</h2>
                <div className="modal__text">Не забудь проверить
                    ящик “Спам”!!!!!!!
                </div>
                <button className="modal__btn" onClick={closeModal}>Понятно!!!</button>
            </div>
        </CustomModal>
    );
};

export default ModalForgotPassword;