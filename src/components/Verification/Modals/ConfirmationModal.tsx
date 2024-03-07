import React, {useEffect} from 'react';
import Modal from 'react-modal/';
import {useConfirmationMutation} from "../../../redux/api/api";
import {useNavigate} from "react-router-dom";


Modal.setAppElement('#root')

interface IProps{
    isOpen: boolean,
    setIsOpen: (v : boolean) => void
    token: string
}

function ConfirmationModal({setIsOpen, isOpen, token} : IProps) {

    const [mutate, {data, status}] = useConfirmationMutation()

    const navigate = useNavigate()

    useEffect(() => {
        mutate(token)
    }, [mutate, token]);

    console.log(data, status)

    function closeModal() {
        navigate('/signIn')
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
                    <h2 className="modal__title">Ваша почта была подтверждена</h2>
                    <div className="modal__text">Вы можете вернуться на страницу авторизации</div>
                    <button className="modal__btn" onClick={closeModal}>Вернуться</button>
                </div>
            </Modal>
        </div>
    );
}

export default ConfirmationModal



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

