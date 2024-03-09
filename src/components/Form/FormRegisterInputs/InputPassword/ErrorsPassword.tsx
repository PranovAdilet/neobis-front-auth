import React, {useMemo} from 'react';

const ErrorsPassword = ({password} : {password : string}) => {

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

    const passwordValidation = validatePassword(password)

    const validateClassnames = (isValid: boolean) => isValid ? 'login__error-text-valid' : 'login__error-text'
    const validateFields = (isValid: boolean) => isValid ? '✅' : '❌'



    return (
        <>
            <p className={`login__error-text ${validateClassnames(passwordValidation.validLength)}`}>От 8 до 15 символов
                {validateFields(passwordValidation.validLength)}
            </p>
            <p className={`login__error-text ${validateClassnames(passwordValidation.containsLetter)}`}>Строчные и прописные буквы
                {validateFields(passwordValidation.containsLetter)}
            </p>
            <p className={`login__error-text ${validateClassnames(passwordValidation.containsNumber)}`}>Минимум 1 цифра
                {validateFields(passwordValidation.containsNumber)}
            </p>
            <p className={`login__error-text ${validateClassnames(passwordValidation.containsSymbol)}`}>Минимум 1 спецсимвол (!, ", #, $...)
                {validateFields(passwordValidation.containsSymbol)}
            </p>
        </>
    );
};

export default ErrorsPassword;