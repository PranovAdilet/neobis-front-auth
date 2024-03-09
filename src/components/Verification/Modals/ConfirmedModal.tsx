import React, {useEffect} from 'react';
import {useConfirmationMutation} from "../../../api/api";
import {useNavigate} from "react-router-dom";
import CustomModal from "../../Modal/Modal";


interface IProps{
    isOpen: boolean,
    setIsOpen: (v : boolean) => void
    token: string
}

function ConfirmedModal({setIsOpen, isOpen, token} : IProps) {

    const [mutate] = useConfirmationMutation()

    const navigate = useNavigate()

    useEffect(() => {
        mutate(token)
    }, [mutate, token]);


    function closeModal() {
        navigate('/signIn')
    }


    return (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="modal">
                <h2 className="modal__title">Ваша почта была подтверждена</h2>
                <div className="modal__text">Вы можете вернуться на страницу авторизации</div>
                <button className="modal__btn" onClick={closeModal}>Вернуться</button>
            </div>
        </CustomModal>
    );
}

export default ConfirmedModal


