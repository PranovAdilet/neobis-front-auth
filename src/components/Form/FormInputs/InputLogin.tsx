import React from 'react';
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {IShippingFields} from "../../../interface/interface";

interface IProps{
    errors: FieldErrors<IShippingFields>
    register: UseFormRegister<IShippingFields>
}

const InputLogin = ({register, errors} : IProps) => {
    return (
        <>
            <input
                {...register('username', {
                    required: 'Введите логин',
                    minLength: {value: 3, message: 'Минимальная длина - 3'},
                })}
                maxLength={25}
                placeholder="Придумай логин"
                className="login__form-input"
                type="text"
            />
            <p className="login__error-text">{errors.username && errors.username.message}</p>
        </>
    );
};

export default InputLogin;