import React, {useEffect, useState} from 'react';
import InputPassword from "../../Form/FormInputs/InputPassword/InputPassword";
import {SubmitHandler, useForm} from "react-hook-form";
import {IShippingFields} from "../../../interface/app.interface";
import {useResetPasswordMutation} from "../../../redux/api/api";
import {useSearchParams} from "react-router-dom";

const ResetPasswordForm = () => {

    const [password, setPassword] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)

    const {
        register,
        handleSubmit,
        reset,

    } = useForm<IShippingFields>()


    const [resetPassword] = useResetPasswordMutation()
    const [searchParams] = useSearchParams()
    const rpt = searchParams.get('rpt')

    const onSubmit: SubmitHandler<IShippingFields> = async (data) => {
        if (rpt){
            const newData = {
                password,
                rpt: rpt
            }

            await resetPassword(newData)
        }else {
            alert("Подтверди почту!")
        }
        setPassword('')
        reset()
    }


    useEffect(() => {
        if (password.length > 7 && password.length < 16 && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password) && /\d/.test(password)){
            setIsDisabled(false)
        }else {
            setIsDisabled(true)
        }
    }, [password])


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login__form">

            <h2 className="login__form-title">Восстановление пароля</h2>
            <InputPassword placeholder="Введи новый пароль" register={register} password={password}
                           setPassword={setPassword}/>

            <button disabled={isDisabled} type="submit" className="login__form-btn">Изменить пароль
            </button>
        </form>
    );
};

export default ResetPasswordForm;