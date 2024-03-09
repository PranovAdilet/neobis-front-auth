import React, {ChangeEvent} from 'react';

interface IProps{
    username: string
    setUsername: (state : string) => void
}

const InputForgotPassword = ({username , setUsername} : IProps) => {


    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {

        setUsername(e.target.value)
    }

    return (
        <>
            <input
                minLength={6}
                maxLength={30}
                required
                placeholder="Введите логин или адрес электронной почты"
                className="login__form-input"
                type="text"
                value={username}
                onChange={handleChangeInput}
            />
        </>
    );
};

export default InputForgotPassword;