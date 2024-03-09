import React, {useEffect} from 'react';
import {FieldErrors, RegisterOptions, UseFormRegister, UseFormWatch} from "react-hook-form";
import {IShippingFields} from "../../../../interface/app.interface";
import {useCheckPresenceMutation} from "../../../../api/api";


interface IProps{
    errors: FieldErrors<IShippingFields>
    register: UseFormRegister<IShippingFields>
    watch: UseFormWatch<IShippingFields>
    isMatchesValue: boolean
    setIsMatchesValue: (v: boolean) => void
    value: string
    setValue: (v: string) => void
    name: "email" | "username"
    validate: RegisterOptions<IShippingFields>
    placeholder: string
}

const InputI = ({register, errors, watch, isMatchesValue, setIsMatchesValue, value, setValue, name, validate, placeholder} : IProps) => {

    const [ mutate] = useCheckPresenceMutation()

    const valueField = watch(`${name}`)

    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(valueField)
        }, 700)

        return () => clearTimeout(timer)
    }, [valueField])


    useEffect(() => {

        const uniqueFieldChecker = async () => {

            try {
                if (value?.length >= 5 && value?.length <= 25 && /^[^ ]+@[^ ]+\.[a-z]{2,5}$/.test(value)) {

                    const newData = {
                        [name]: value,
                        endpoint: 'http://localhost:3000/',
                    }

                    const response = await mutate(newData)

                    if ('data' in response) {
                        setIsMatchesValue(response.data)
                    }

                } else {
                    setIsMatchesValue(false);
                }

            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        uniqueFieldChecker()

    }, [value, mutate, setIsMatchesValue])


    console.log(isMatchesValue)

    return (
        <>
            <input
                placeholder={placeholder}
                maxLength={25}
                className="login__form-input"
                type={name}
                {...register(name, validate)}
                name={name}
            />
            {isMatchesValue && <p className="login__error-text">{name} уже занят</p>}
            {errors[name] && <p className="login__error-text">{errors[name]!.message}</p>}
        </>
    );
};

export default InputI;