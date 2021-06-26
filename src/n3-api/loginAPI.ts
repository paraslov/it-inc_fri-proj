import {instance} from "./api";


export const loginAPI = {
    login(data: LoginUser) {
        return instance.post<LoginResponse>('auth/login',data)
    },
    register(data: LoginUser) {
        return instance.post('/auth/register', data)
    }
}


interface LoginUser {
    email: string
    password: string
    rememberMe?: boolean
}

export interface LoginResponse {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean

    error: string
}


