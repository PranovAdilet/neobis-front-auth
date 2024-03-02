import React, {useEffect, useState} from 'react';
import {FieldErrors, UseFormRegister, UseFormWatch} from "react-hook-form";
import {IShippingFields} from "../../../interface/app.interface";

import {useCheckPresenceMutation} from "../../../redux/api/api";
import {uniqueFieldChecker} from "../../../assets/utils/inputChecker";

interface IProps{
    errors: FieldErrors<IShippingFields>
    register: UseFormRegister<IShippingFields>
    watch: UseFormWatch<IShippingFields>
    isMatchesLogin: boolean
    setIsMatchesLogin: (v: boolean) => void
}

const InputLogin = ({register, errors, watch, isMatchesLogin, setIsMatchesLogin} : IProps) => {

    const [ mutate] = useCheckPresenceMutation()


    const [login, setLogin] = useState('')

    const loginField = watch("username")

    useEffect(() => {
        const timer = setTimeout(() => {
            setLogin(loginField)
        }, 700);

        return () => clearTimeout(timer);
    }, [loginField]);

    useEffect(() => {
        uniqueFieldChecker({
            value: login,
            postValue: "username",
            minLength: 5,
            maxLength: 15,
            testRegex: /^[^\d]+$/,
            setIsState: setIsMatchesLogin,
            mutate
        })

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