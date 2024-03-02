import React, {ChangeEvent, useCallback, useState} from 'react';
import {GoEye, GoEyeClosed} from "react-icons/go";
import _ from "lodash";
import {UseFormRegister} from "react-hook-form";
import {IShippingFields} from "../../../../interface/app.interface";
import ErrorsPassword from "./ErrorsPassword";


interface IProps{
    register: UseFormRegister<IShippingFields>
    password: string
    setPassword: (value : string) => void
}

const InputPassword = ({register,password, setPassword } : IProps) => {

    const [showPassword, setShowPassword] = useState(false)


    const handleChange = useCallback((e : string) => {
        setPassword(e)
    }, [setPassword])

    const debouncedHandleChange = _.debounce(handleChange, 500);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }


    return (
        <>
            <label className="login__form-label">
                <input
                    placeholder="Создай пароль"
                    className="login__form-input"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 8,
                            message: 'Пароль должен содержать от 8 до 15 символов',
                        },
                        maxLength: {
                            value: 15,
                            message: 'Пароль должен содержать от 8 до 15 символов',
                        },
                        pattern: {
                            value: /(?=.*[a-z])(?=.*[A-Z])/,
                            message: 'Строчные и прописные буквы',
                        },
                        validate: {
                            containsNumber: (value) => /\d/.test(value) || 'Минимум 1 цифра',
                            containsSymbol: (value) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value) || 'Минимум 1 спецсимвол',
                        },
                    })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        debouncedHandleChange(e.target.value);
                    }}
                />
                <span onClick={togglePasswordVisibility} className="login__icon">
                        {showPassword ? <GoEyeClosed/> : <GoEye/>}
                    </span>
            </label>
            <ErrorsPassword password={password}/>

        </>
    );
};

export default InputPassword;