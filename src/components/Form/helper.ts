import * as Yup from "yup";

export const initialLoginValues = {
    login: '',
    password: ''
}


export const schema = Yup.object().shape({
    login: Yup.string()
        .required('Введите логин'),
    password: Yup.string()
        .required('Введите пароль')
});
