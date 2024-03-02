import React, {useEffect, useState} from 'react';
import {Field, Formik, Form} from "formik";
import {GoEye, GoEyeClosed} from "react-icons/go";
import {initialLoginValues, schema} from "../../../assets/utils/helper";
import {useNavigate} from "react-router-dom";
import {useConfirmationQuery, useSignInMutation} from "../../../redux/api/api";

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/signUp')
    }
    const [mutate] = useSignInMutation()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    useEffect(() => {

    }, []);

    return (
        <Formik
            initialValues={initialLoginValues}
            validationSchema={schema}

            onSubmit={async (values, {resetForm}) => {

                try {
                    resetForm()

                    const response = await mutate(values);

                    if ('data' in response) {

                        localStorage.setItem('accessToken', response.data.accessToken)
                        localStorage.setItem('refreshToken', response.data.refreshToken)
                        navigate('/profile')

                    }else {

                        setError(true)

                        setTimeout(function() {
                            setError(false)
                        }, 5000)

                    }

                } catch (error) {
                    console.error(error)
                }
            }}
        >
            {({ errors, touched, dirty }) => {
                const isDisabled = () => !dirty || Object.keys(errors).length > 0

                return (
                    <div className="login__right">
                        <Form className="login__form">
                            {error && <h3 className="login__error">Неверный логин или пароль</h3>}
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
                                    {showPassword ? <GoEyeClosed /> : <GoEye />}
                                </span>
                            </label>
                            {errors.password && touched.password ? (
                                <p className="login__error-text">{errors.password}</p>
                            ) : null}

                            <button disabled={isDisabled()} type="submit" className="login__form-btn">Войти</button>
                            <h3 onClick={handleNavigate} className="login__form-text">У меня еще нет аккаунта</h3>
                        </Form>
                    </div>
                )}
            }
        </Formik>
    );
};

export default LoginForm;