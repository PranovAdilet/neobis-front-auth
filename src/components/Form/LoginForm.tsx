import React from 'react';
import {Field, Formik, Form} from "formik";
import {GoEye} from "react-icons/go";
import {initialLoginValues, schema} from "./helper";
import {useNavigate} from "react-router-dom";



const LoginForm = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/signUp')
    }



    return (
        <Formik
            initialValues={initialLoginValues}
            validationSchema={schema}

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
                            <h3 className="login__error">Неверный логин или пароль</h3>
                            <h2 className="login__form-title">Вэлком бэк!</h2>
                            <Field
                                placeholder="Введи туда-сюда логин"
                                className="login__form-input"
                                type="text"
                                name="login"
                            />
                            {errors.login && touched.login ? (
                                <p className="login__error-text">{errors.login}</p>
                            ) : null}
                            <label className="login__form-label">
                                <Field
                                    placeholder="Пароль (тоже введи)"
                                    className="login__form-input"
                                    name="password"
                                    type="password"
                                />
                                <span className="login__icon"><GoEye/></span>
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