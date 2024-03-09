import React, {useEffect} from 'react';
import {useResendConfirmationMutation} from "../../../api/api";
import {useSelector} from "react-redux";
import {selectUser} from "../../../redux/reducers/user";
import CustomModal from "../../Modal/Modal";


interface IProps{
    isOpen: boolean,
    setIsOpen: (v : boolean) => void
}

function ConfirmModal({setIsOpen, isOpen} : IProps) {

    const [mutate] = useResendConfirmationMutation()

    const {user} = useSelector(selectUser)

    function closeModal() {
        setIsOpen(false)
    }

    useEffect(() => {
        if (user){
            mutate(user)
        }
    }, [user, mutate])


    return (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="modal">
                <h2 className="modal__title">Мы выслали еще одно письмо на указанную тобой почту
                    example@gmail.com</h2>
                <div className="modal__text">Не забудь проверить
                    ящик “Спам”!!!!!!!
                </div>
                <button className="modal__btn" onClick={closeModal}>Понятно!!!</button>
            </div>
        </CustomModal>
    );
}

export default ConfirmModal

