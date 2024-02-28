import React, {useState} from 'react';
import {Field, Formik, Form} from "formik";
import {GoEye, GoEyeClosed} from "react-icons/go";
import {initialRegistrationValues, RegistrationSchema} from "./helper";


const RegistrationForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    }

    return (
        <Formik
            initialValues={initialRegistrationValues}
            validationSchema={RegistrationSchema}

            onSubmit={(values, {resetForm}) => {
                console.log(values)
                resetForm()

            }}
        >
            {({ errors, touched, dirty }) => {
                const isDisabled = () => !dirty || Object.keys(errors).length > 0
                return (

                    <div className="login__right">
                        <Form className="login__form">
                            <h2 className="login__form-title">Создать аккаунт Lorby</h2>
                            <Field
                                name="email"
                                placeholder="Введи адрес почты"
                                className="login__form-input"
                                type="email"
                            />
                            {errors.email && touched.email ? (
                                <p className="login__error-text">{errors.email}</p>
                            ) : null}
                            <Field
                                name="login"
                                placeholder="Придумай логин"
                                className="login__form-input"
                                type="text"
                            />
                            {errors.login && touched.login ? (
                                <p className="login__error-text">{errors.login}</p>
                            ) : null}
                            <label className="login__form-label">
                                <Field
                                    placeholder="Создай пароль"
                                    className="login__form-input"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                />
                                <span onClick={togglePasswordVisibility} className="login__icon">
                                    {showPassword ? <GoEyeClosed /> : <GoEye />}
                                </span>
                            </label>
                            {errors.password && touched.password ? (
                                <p className="login__error-text">{errors.password}</p>
                            ) : null}
                            <label className="login__form-label">
                                <Field
                                    placeholder="Повтори пароль"
                                    className="login__form-input"
                                    type={showRepeatPassword ? 'text' : 'password'}
                                    name="repeatPassword"
                                />
                                <span onClick={toggleRepeatPasswordVisibility} className="login__icon">
                                    {showRepeatPassword ? <GoEyeClosed /> : <GoEye />}
                                </span>
                            </label>
                            {errors.repeatPassword && touched.repeatPassword ? (
                                <p className="login__error-text">{errors.repeatPassword}</p>
                            ) : null}
                            <button disabled={isDisabled()} type="submit" className="login__form-btn">Далее</button>
                        </Form>
                    </div>
                )
            }
            }
        </Formik>
    );
};

export default RegistrationForm;