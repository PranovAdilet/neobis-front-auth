import * as Yup from "yup";

export const initialLoginValues = {
    login: '',
    password: ''
}

export const initialRegistrationValues = {
    email: '',
    login: '',
    password: '',
    repeatPassword: ''
}


export const schema = Yup.object().shape({
    login: Yup.string()
        .required('Введите логин'),
    password: Yup.string()
        .required('Введите пароль')
});

export const RegistrationSchema = Yup.object().shape({
    login: Yup.string()
        .min(2, 'Слишком коротко!!')
        .max(25, 'Слишком длинный')
        .required('Введите логин'),
    email: Yup.string().email('Неверный адрес').required('Заполните поле'),
    password: Yup.string()
        .required('Введите пароль')
        .min(8, "от 8 до 15 символов")
        .max(15, 'от 8 до 15 символов')
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Строчные и прописные буквы")
        .matches(/\d/, "Минимум 1 цифра")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Минимум 1 спецсимвол"),
    repeatPassword: Yup.string()
        .required('Заполните поле')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')

});