export interface ILoginField{
    username: string
    password: string
}

export interface IShippingFields extends ILoginField{
    email: string
    repeatPassword: string
}



export interface ILoginUser{
    accessToken: string
    refreshToken: string
}

export interface ICheckPresenceData{
    username?: string
    email?:string
    endpoint: string
}
