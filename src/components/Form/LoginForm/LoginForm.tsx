import React, {useState} from 'react';
import {Field, Formik, Form} from "formik";
import {GoEye, GoEyeClosed} from "react-icons/go";
import {initialLoginValues, schema} from "../../../utils/helper";
import {useNavigate} from "react-router-dom";
import {useSignInMutation} from "../../../redux/api/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ILoginField} from "../../../interface/app.interface";
import {useAppDispatch} from "../../../redux/hooks/reduxHooks";
import {isAuthUser} from "../../../redux/reducers/user";

interface IProps {
    setForgotPassword : (v: boolean) => void
}

const LoginForm = ({setForgotPassword} : IProps) => {

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleNavigate = () => {
        navigate('/signUp')
    }
    const [mutate] = useSignInMutation()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    const handleForgotPassword = () => setForgotPassword(true)

    const onSubmit = async (values : ILoginField, {resetForm}: {resetForm : () => void} ) => {
        try {

            const response = await mutate(values);

            if ('data' in response) {

                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)

                dispatch(isAuthUser())
                navigate('/profile')

            }else {
                resetForm()
                toast.error("Неверный логин или пароль")
            }

        } catch (error) {
            console.error(error)
            toast.error("Произошла ошибка на сервере!")
        }
    }



    return (
        <Formik
            initialValues={initialLoginValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, dirty }) => {
                const isDisabled = () => !dirty || Object.keys(errors).length > 0

                return (
                    <div className="login__right">
                        <Form className="login__form">
                            <ToastContainer />
                            <h2 className="login__form-title">Вэлком бэк!</h2>
                            <Field
                                placeholder="Введи туда-сюда логин"
                                className="login__form-input"
                                type="text"
                                name="username"
                            />
                            {errors.username && touched.username ? (
                                <p className="login__error-text">{errors.username}</p>
                            ) : null}
                            <label className="login__form-label">
                                <Field
                                    placeholder="Пароль (тоже введи)"
                                    className="login__form-input"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <span onClick={togglePasswordVisibility} className="login__icon">
                                    {showPassword ? <GoEyeClosed/> : <GoEye/>}
                                </span>
                            </label>
                            {errors.password && touched.password ? (
                                <p className="login__error-text">{errors.password}</p>
                            ) : null}
                            <h3 onClick={handleForgotPassword} className="login__form-forgot">Забыли пароль?</h3>

                            <button disabled={isDisabled()} type="submit" className="login__form-btn">Войти</button>
                            <h3 onClick={handleNavigate} className="login__form-text">У меня еще нет аккаунта</h3>
                        </Form>
                    </div>
                )
            }
            }
        </Formik>
    );
};

export default LoginForm;