import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import {GoEye, GoEyeClosed} from "react-icons/go";
import _ from "lodash";
import {UseFormRegister} from "react-hook-form";
import {IShippingFields} from "../../../interface/interface";


interface IProps{
    register: UseFormRegister<IShippingFields>
    password: string
    setPassword: (value : string) => void
}

const InputPassword = ({register,password, setPassword } : IProps) => {

    const [showPassword, setShowPassword] = useState(false)

    const validatePassword = useMemo(() => {
        return ((password: string) => {
            return {
                validLength: password.length >= 8 && password.length <= 15,
                containsLetter: /^(?=.*[a-z])(?=.*[A-Z])/.test(password),
                containsNumber: /\d/.test(password),
                containsSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
            };
        })
    }, [])

    const passwordValidation = validatePassword(password);

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

            <p className={`login__error-text ${passwordValidation.validLength ? 'login__error-text-valid' : 'login__error-text'}`}>От
                8 до
                15 символов {passwordValidation.validLength ? '✅' : '❌'}</p>
            <p className={`login__error-text ${passwordValidation.containsLetter ? 'login__error-text-valid' : 'login__error-text'}`}>Строчные
                и прописные буквы {passwordValidation.containsLetter ? '✅' : '❌'}</p>
            <p className={`login__error-text ${passwordValidation.containsNumber ? 'login__error-text-valid' : 'login__error-text'}`}>Минимум
                1 цифра {passwordValidation.containsNumber ? '✅' : '❌'}</p>
            <p className={`login__error-text ${passwordValidation.containsSymbol ? 'login__error-text-valid' : 'login__error-text'}`}>Минимум
                1 спецсимвол (!, ", #, $...) {passwordValidation.containsSymbol ? '✅' : '❌'}</p>
        </>
    );
};

export default InputPassword;