import React from 'react';
import Modal from 'react-modal/';
import {Link, useNavigate} from "react-router-dom";


Modal.setAppElement('#root')

interface IProps{
    isOpen: boolean,
    setIsOpen: (v : boolean) => void
}

function ModalLogout({isOpen, setIsOpen} : IProps) {

    const navigate = useNavigate()

    function closeModal() {
        setIsOpen(false)
    }

    const handleLogout = () => {

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/')
    }

    return (
        <div className="custom-modal">

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="modal"
            >
                <div className="logout-modal modal">
                    <h2 className="logout-modal__title">Выйти?</h2>
                    <div className="modal__text">Точно выйти?</div>
                    <button type="button" onClick={handleLogout} className="modal__btn">Да точно!</button>
                    <h2 onClick={closeModal} className="logout-modal__subtitle">Нет остаться</h2>
                </div>
            </Modal>
        </div>
    );
}

export default ModalLogout



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '32px',
        border: 'none'
    },
};

