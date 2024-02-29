import React from 'react';
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {IShippingFields} from "../../../interface/interface";

interface IProps{
    errors: FieldErrors<IShippingFields>
    register: UseFormRegister<IShippingFields>
}

const InputEmail = ({register, errors} : IProps) => {
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
                })}
            />
            <p className="login__error-text">{errors.email && errors.email.message}</p>
        </>
    );
};

export default InputEmail;