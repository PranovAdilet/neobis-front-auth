
export interface ILoginField{
    username: string
    password: string
}

export interface IShippingFields extends ILoginField{
    email: string
    repeatPassword: string
}