import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IShippingFields} from "../../../interface/interface";
import InputPassword from "../FormInputs/InputPassword";
import InputRepeatPassword from "../FormInputs/InputRepeatPassword";
import InputEmail from "../FormInputs/InputEmail";
import InputLogin from "../FormInputs/InputLogin";


const RegistrationForm = () => {

    const [password, setPassword] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IShippingFields>({mode: "onChange"})


    const onSubmit: SubmitHandler<IShippingFields> = async (data) => {
        console.log({...data})
        try {
            reset()

        } catch (error) {
            console.error(error)
        }
    };


    return (
        <div className="login__right login__right-signUp">
            <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                <h2 className="login__form-title">Создать аккаунт Lorby</h2>

                <InputEmail register={register} errors={errors}/>
                <InputLogin errors={errors} register={register}/>
                <InputPassword password={password} setPassword={setPassword} register={register}/>
                <InputRepeatPassword password={password} register={register} errors={errors}/>

                <button disabled={!isValid} type="submit" className="login__form-btn login__form-btn-signUp">Далее</button>
            </form>
        </div>
    );
};

export default RegistrationForm;