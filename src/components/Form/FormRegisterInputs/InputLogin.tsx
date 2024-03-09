import React, {useEffect, useState} from 'react';
import {FieldErrors, UseFormRegister, UseFormWatch} from "react-hook-form";
import {IShippingFields} from "../../../interface/app.interface";

import {useCheckPresenceMutation} from "../../../api/api";
import {uniqueFieldChecker} from "../../../utils/inputChecker";

interface IProps{
    errors: FieldErrors<IShippingFields>
    register: UseFormRegister<IShippingFields>
    watch: UseFormWatch<IShippingFields>
    isMatchesLogin: boolean
    setIsMatchesLogin: (v: boolean) => void
    setIsDisabled: (v: boolean) => void
}

const InputLogin = ({register, errors, watch, isMatchesLogin, setIsMatchesLogin, setIsDisabled} : IProps) => {

    const [ mutate] = useCheckPresenceMutation()


    const [login, setLogin] = useState('')

    const loginField = watch("username")

    useEffect(() => {

        setIsDisabled(true)
        const timer = setTimeout(() => {
            setLogin(loginField)
        }, 600);

        return () => {
            clearTimeout(timer)
        }
    }, [loginField])

    useEffect(() => {

        uniqueFieldChecker({
            value: login,
            fieldName: "username",
            isValidLength: login?.length >= 5 && login?.length <= 15,
            isTested: /^[^\d]+$/.test(login),
            setIsState: setIsMatchesLogin,
            mutate
        })

        setIsDisabled(false)


    }, [login, mutate, setIsMatchesLogin])


    return (
        <>
            <input
                {...register('username', {
                    required: 'Введите логин',
                    minLength: {value: 6, message: 'Минимальная длина - 6'},
                    maxLength: {
                        value: 15,
                        message: 'Логин должен содержать не более 15 символов',
                    },
                    pattern: {
                        value: /^[^\d]+$/,
                        message: "Логин не может содержать цифры!"
                    }

                })}

                name="username"
                maxLength={20}
                placeholder="Придумай логин"
                className="login__form-input"
                type="text"
            />
            {isMatchesLogin && <p className="login__error-text">Логин уже занят</p>}
            {errors.username && <p className="login__error-text">{errors.username.message}</p>}
        </>
    );
};

export default InputLogin;