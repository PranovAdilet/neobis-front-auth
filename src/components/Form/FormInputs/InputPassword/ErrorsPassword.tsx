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

    const passwordValidation = validatePassword(password);

    const validLengthClassname = passwordValidation.validLength ? 'login__error-text-valid' : 'login__error-text'
    const validLetterClassname = passwordValidation.containsLetter ? 'login__error-text-valid' : 'login__error-text'
    const validNumberClassname = passwordValidation.containsNumber ? 'login__error-text-valid' : 'login__error-text'
    const validSymbolClassname = passwordValidation.containsSymbol ? 'login__error-text-valid' : 'login__error-text'

    const validLength = passwordValidation.validLength ? '✅' : '❌'
    const validLetter = passwordValidation.containsLetter ? '✅' : '❌'
    const validNumber = passwordValidation.containsNumber ? '✅' : '❌'
    const validSymbol = passwordValidation.containsSymbol ? '✅' : '❌'


    return (
        <>
            <p className={`login__error-text ${validLengthClassname}`}>От 8 до 15 символов
                {validLength}
            </p>
            <p className={`login__error-text ${validLetterClassname}`}>Строчные и прописные буквы
                {validLetter}
            </p>
            <p className={`login__error-text ${validNumberClassname}`}>Минимум 1 цифра
                {validNumber}
            </p>
            <p className={`login__error-text ${validSymbolClassname}`}>Минимум 1 спецсимвол (!, ", #, $...)
                {validSymbol}
            </p>
        </>
    );
};

export default ErrorsPassword;