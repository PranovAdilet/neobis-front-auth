import * as Yup from "yup";

export const initialLoginValues = {
    username: '',
    password: ''
}


export const schema = Yup.object().shape({
    username: Yup.string()
        .required('Введите логин'),
    password: Yup.string()
        .required('Введите пароль')
});


