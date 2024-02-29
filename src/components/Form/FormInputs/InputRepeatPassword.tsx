import React, {useState} from 'react';
import {GoEye, GoEyeClosed} from "react-icons/go";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {IShippingFields} from "../../../interface/interface";


interface IProps{
    register: UseFormRegister<IShippingFields>
    password: string
    errors: FieldErrors<IShippingFields>
}

const InputRepeatPassword = ({register, password, errors} : IProps) => {

    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    }

    return (
        <>
            <label className="login__form-label">
                <input
                    placeholder="Повтори пароль"
                    className="login__form-input"
                    type={showRepeatPassword ? 'text' : 'password'}
                    {...register('repeatPassword', {
                        required: 'Повторите пароль',
                        validate: (value) => value === password || 'Пароли должны совпадать'
                    })}

                />
                <span onClick={toggleRepeatPasswordVisibility} className="login__icon">
                                    {showRepeatPassword ? <GoEyeClosed/> : <GoEye/>}
                                </span>
            </label>
            <p className="login__error-text">{errors.repeatPassword && errors.repeatPassword.message}</p>
        </>
    );
};

export default InputRepeatPassword;