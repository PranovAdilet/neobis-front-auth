import React, {useState} from 'react';
import {GoEye, GoEyeClosed} from "react-icons/go";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {IShippingFields} from "../../../interface/app.interface";


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

    const isMatchesPassword = errors.repeatPassword ? 'login__form-input-error' : ''

    const isHidden = showRepeatPassword ? <GoEyeClosed/> : <GoEye/>

    return (
        <>
            <label className="login__form-label" htmlFor="repeatPassword">
                <input
                    id="repeatPassword"
                    placeholder="Повтори пароль"
                    className={`login__form-input ${isMatchesPassword}`}
                    type={showRepeatPassword ? 'text' : 'password'}
                    {...register('repeatPassword', {
                        required: 'Повторите пароль',
                        validate: (value) => value === password || 'Пароли должны совпадать'
                    })}

                />
                <span onClick={toggleRepeatPasswordVisibility} className="login__icon">
                    {isHidden}
                </span>
            </label>
            <p className="login__error-text">{errors.repeatPassword && errors.repeatPassword.message}</p>
        </>
    );
};

export default InputRepeatPassword;