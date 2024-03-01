export interface ILoginField{
    username: string
    password: string
}

export interface IShippingFields extends ILoginField{
    email: string
    repeatPassword: string
}

export interface IUserData{
    email: string
    username: string
    password: string
}

export interface ILoginUser{
    accessToken: string
    refreshToken: string
}