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


export interface IResetPassword{
    rpt: string
    password: string
}

export interface IUser{
    username: string
    email: string
}

export interface IError{
    data: string
    error: string
    originalStatus: number
    status: string
}