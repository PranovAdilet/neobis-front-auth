import React from 'react';
import Modal from 'react-modal/';

interface IProps{
    isOpen: boolean,
    setIsOpen: (v : boolean) => void
}

function CustomModal({setIsOpen, isOpen} : IProps) {

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className="custom-modal">

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="modal"
            >
                <div className="modal">
                    <h2 className="modal__title">Мы выслали еще одно письмо на указанную тобой почту
                        example@gmail.com</h2>
                    <div className="modal__text">Не забудь проверить
                        ящик “Спам”!!!!!!!
                    </div>
                    <button className="modal__btn" onClick={closeModal}>Понятно!!!</button>
                </div>
            </Modal>
        </div>
    );
}

export default CustomModal



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

