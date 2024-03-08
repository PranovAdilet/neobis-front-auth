import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../redux/hooks/reduxHooks";
import {isAuthUser} from "../../../redux/reducers/user";
import {useRevokeTokenMutation} from "../../../redux/api/api";
import CustomModal from "../../Modal/Modal";


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
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="logout-modal modal">
                <h2 className="logout-modal__title">Выйти?</h2>
                <div className="modal__text">Точно выйти?</div>
                <button type="button" onClick={handleLogout} className="modal__btn">Да точно!</button>
                <h2 onClick={closeModal} className="logout-modal__subtitle">Нет остаться</h2>
            </div>
        </CustomModal>
    );
}

export default ModalLogout
