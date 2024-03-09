import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IShippingFields} from "../../../interface/app.interface";
import InputPassword from "../FormRegisterInputs/InputPassword/InputPassword";
import InputRepeatPassword from "../FormRegisterInputs/InputRepeatPassword";
import InputEmail from "../FormRegisterInputs/InputEmail";
import InputLogin from "../FormRegisterInputs/InputLogin";
import {useSignUpMutation} from "../../../api/api";
import {useNavigate} from "react-router-dom";
import {saveUserData} from "../../../redux/reducers/user";
import {useAppDispatch} from "../../../redux/hooks/reduxHooks";
import {toast} from "react-toastify";


const RegistrationForm = () => {

    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [isMatchesLogin, setIsMatchesLogin] = useState(false)
    const [isMatchesEmail, setIsMatchesEmail] = useState(false)

    const [isButtonEnabled, setIsButtonEnabled] = useState(false)

    const [mutate] = useSignUpMutation()

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch

    } = useForm<IShippingFields>({mode: "onChange"})


    const onSubmit: SubmitHandler<IShippingFields> = async (data) => {
        try {
            setPassword('')
            await mutate(data).then(_ => {
                    const userData = {
                        username: data.username,
                        email: data.email
                    }
                    reset()
                    dispatch(saveUserData(userData))
                    navigate('/confirmation')
                })
                .catch(error => toast.error(`Ошибка: ${error}`))


        } catch (error) {
            toast.error(`Ошибка: ${error}`)
        }
    }

    const isDisabled = !isValid || isMatchesEmail || isMatchesLogin || isButtonEnabled


    return (
        <div className="login__right login__right-signUp">
            <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                <h2 className="login__form-title">Создать аккаунт Lorby</h2>
                <InputEmail
                    setIsDisabled={setIsButtonEnabled}
                    watch={watch}
                    register={register}
                    errors={errors}
                    isMatchesEmail={isMatchesEmail}
                    setIsMatchesEmail={setIsMatchesEmail}
                />
                <InputLogin
                    setIsDisabled={setIsButtonEnabled}
                    watch={watch}
                    errors={errors}
                    register={register}
                    isMatchesLogin={isMatchesLogin}
                    setIsMatchesLogin={setIsMatchesLogin}
                />
                <InputPassword
                    placeholder="Создай пароль"
                    password={password}
                    setPassword={setPassword} register={register}
                />
                <InputRepeatPassword
                    password={password}
                    register={register}
                    errors={errors}
                />

                <button disabled={isDisabled} type="submit" className="login__form-btn login__form-btn-signUp">Далее</button>
            </form>
        </div>
    );
};

export default RegistrationForm;