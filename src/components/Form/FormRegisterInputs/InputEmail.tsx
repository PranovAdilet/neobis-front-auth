import React, {useEffect, useState} from 'react';
import {FieldErrors, UseFormRegister, UseFormWatch} from "react-hook-form";
import {IShippingFields} from "../../../interface/app.interface";
import {useCheckPresenceMutation} from "../../../api/api";
import {uniqueFieldChecker} from "../../../utils/inputChecker";

interface IProps{
    errors: FieldErrors<IShippingFields>
    register: UseFormRegister<IShippingFields>
    watch: UseFormWatch<IShippingFields>
    isMatchesEmail: boolean
    setIsMatchesEmail: (state: boolean) => void
    setIsDisabled: (state: boolean) => void
}

const InputEmail = ({register, errors, watch, isMatchesEmail, setIsMatchesEmail, setIsDisabled} : IProps) => {

    const [ mutate] = useCheckPresenceMutation()

    const [email, setEmail] = useState('')

    const emailField = watch("email")

    useEffect(() => {

        setIsDisabled(true)

        const timer = setTimeout(() => {
            setEmail(emailField)
        }, 600)

        return () => {
            clearTimeout(timer)
        }
// eslint-disable-next-line
    }, [emailField])


    useEffect(() => {

        uniqueFieldChecker({
            value: email,
            fieldName: "email",
            isValidLength: email?.length >= 5 && email?.length <= 25,
            isTested: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/.test(email),
            setIsState: setIsMatchesEmail,
            mutate
        })

        setIsDisabled(false)
        // eslint-disable-next-line
    }, [email, mutate, setIsMatchesEmail])


    return (
        <>
            <input
                placeholder="Введи адрес почты"
                maxLength={25}
                className="login__form-input"
                type="email"
                {...register('email', {
                    required: 'Заполните поле',
                    pattern: {
                        value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
                        message: 'Неверный адрес',
                    },
                    minLength: {value: 5, message: 'Минимальная длина - 5'},
                    maxLength: {
                        value: 25,
                        message: 'Логин должен содержать не более 25 символов',
                    }
                })}
                name="email"
            />
            {isMatchesEmail && <p className="login__error-text">E-mail уже занят</p>}
            {errors.email && <p className="login__error-text">{errors.email.message}</p>}
        </>
    );
};

export default InputEmail;