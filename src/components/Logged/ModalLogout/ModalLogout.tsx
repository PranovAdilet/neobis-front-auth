import React from 'react';
import Modal from 'react-modal/';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../redux/hooks/reduxHooks";
import {isAuthUser} from "../../../redux/reducers/user";
import {useRevokeTokenMutation} from "../../../redux/api/api";


Modal.setAppElement('#root')

interface IProps{
    isOpen: boolean,
    setIsOpen: (v : boolean) => void
}

function ModalLogout({isOpen, setIsOpen} : IProps) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [mutate] = useRevokeTokenMutation()

    function closeModal() {
        setIsOpen(false)
    }

    const handleLogout = async () => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')


        if (accessToken && refreshToken){
            const tokens = {
                accessToken,
                refreshToken
            }

            await mutate(tokens)
        }

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(isAuthUser(false))

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

