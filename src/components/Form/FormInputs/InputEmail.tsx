import React, {useEffect, useState} from 'react';
import {FieldErrors, UseFormRegister, UseFormWatch} from "react-hook-form";
import {IShippingFields} from "../../../interface/app.interface";
import {useCheckPresenceMutation} from "../../../redux/api/api";
import {uniqueFieldChecker} from "../../../assets/utils/inputChecker";

interface IProps{
    errors: FieldErrors<IShippingFields>
    register: UseFormRegister<IShippingFields>
    watch: UseFormWatch<IShippingFields>
    isMatchesEmail: boolean
    setIsMatchesEmail: (v: boolean) => void
}

const InputEmail = ({register, errors, watch, isMatchesEmail, setIsMatchesEmail} : IProps) => {

    const [ mutate] = useCheckPresenceMutation()

    const [email, setEmail] = useState('')
    const emailField = watch("email")

    useEffect(() => {
        const timer = setTimeout(() => {
            setEmail(emailField);
        }, 700);

        return () => clearTimeout(timer);
    }, [emailField]);


    useEffect(() => {

        uniqueFieldChecker({
            value: email,
            postValue: "email",
            minLength: 5,
            maxLength: 25,
            testRegex: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
            setIsState: setIsMatchesEmail,
            mutate
        })

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