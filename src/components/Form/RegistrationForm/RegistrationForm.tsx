import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IShippingFields} from "../../../interface/app.interface";
import InputPassword from "../FormInputs/InputPassword/InputPassword";
import InputRepeatPassword from "../FormInputs/InputRepeatPassword";
import InputEmail from "../FormInputs/InputEmail";
import InputLogin from "../FormInputs/InputLogin";
import {useSignUpMutation} from "../../../redux/api/api";
import {useNavigate} from "react-router-dom";
import {saveUserData} from "../../../redux/reducers/user";
import {useAppDispatch} from "../../../redux/hooks/reduxHooks";


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

    const isDisabled = !isValid || isMatchesEmail || isMatchesLogin

    useEffect(() => {
        const checkButtonAvailability = () => {
            setIsButtonEnabled(!isDisabled && !isMatchesEmail && !isMatchesLogin);
        }
        checkButtonAvailability()

    }, [isDisabled, isMatchesEmail, isMatchesLogin])


    const onSubmit: SubmitHandler<IShippingFields> = async (data) => {
        try {
            setPassword('')
            await mutate(data)

            const userData = {
                username: data.username,
                email: data.email
            }
            reset()
            dispatch(saveUserData(userData))
            navigate('/confirmation')

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="login__right login__right-signUp">
            <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                <h2 className="login__form-title">Создать аккаунт Lorby</h2>

                <InputEmail watch={watch} register={register} errors={errors} isMatchesEmail={isMatchesEmail} setIsMatchesEmail={setIsMatchesEmail}/>
                <InputLogin watch={watch} errors={errors} register={register} isMatchesLogin={isMatchesLogin} setIsMatchesLogin={setIsMatchesLogin}/>
                <InputPassword password={password} setPassword={setPassword} register={register}/>
                <InputRepeatPassword password={password} register={register} errors={errors}/>

                <button disabled={!isButtonEnabled} type="submit" className="login__form-btn login__form-btn-signUp">Далее</button>
            </form>
        </div>
    );
};

export default RegistrationForm;