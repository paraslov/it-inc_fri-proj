//* =============================================================== Initial state ===================================>>
import {setAppError, setIsFetching} from '../../n1-app/a1-app/app_reducer';
import {TBaseThunk} from '../../n2-bll/store'
import {loginAPI} from "../../n3-api/loginAPI";

const initState = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    publicCardPacksCount: null,
    isAuth: false
}

export const loginReducer = (state: UserDataType = initState, action: TLoginReducerActions): UserDataType => {
    switch (action.type) {
        case 'login/LOGIN_USER':
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const setAuthUserDataAction = (data: UserDataType) => ({type: 'login/LOGIN_USER', data} as const)
// export const authAction = () => ({type: 'login/AUTH_USER'} as const)

//* =============================================================== Thunk creators ==================================>>
export const loginThunk = (data: UserLoginDataType): TThunk => dispatch => {
    dispatch(setIsFetching(true))
    loginAPI.login(data)
        .then(res => {
            if (res.status === 200) {
                dispatch(authThunk())
            } else {
                console.log('something went wrong', res)
            }
        }).catch(error => {
            dispatch(setAppError(error.response.data.error))
            dispatch(setIsFetching(false))
    })
}
export const authThunk = (): TThunk => dispatch => {
    loginAPI.auth()
        .then(res => {
            if (res.status === 200) {
                let {email,
                    _id,
                    name,
                    avatar,
                    publicCardPacksCount} = res.data
                let isAuth = true

                dispatch(setIsFetching(false))
                dispatch(setAuthUserDataAction({email, _id, name, avatar, publicCardPacksCount, isAuth}))
            }
        }).catch(error => {
            dispatch(setAppError(error.response.data.error))
            dispatch(setIsFetching(false))
            setTimeout(() => dispatch(setAppError(null)), 6000)
    })
}
export const logoutThunk = (): TThunk => dispatch => {
    loginAPI.logout()
        .then(res => {
            if (res.status === 200) {
                let isAuth = false
                let email = null
                let _id = null
                let name = null
                let avatar = null
                let publicCardPacksCount = null

                dispatch(setAuthUserDataAction({email, _id, name, avatar, publicCardPacksCount, isAuth}))
            }
        }).catch(error => {
            dispatch(setAppError(error.response.data.error))
            dispatch(setIsFetching(false))
    })
}

export const registerThunk = (data: UserLoginDataType): TThunk => dispatch => {
    loginAPI.register(data)
        .then(res => console.log(res))
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
        })
}

//* =============================================================== Types ===========================================>>
// export type TState = typeof initState
export type UserDataType = {
    _id: null | string,
    email: null | string,
    name: null | string,
    avatar: null | string,
    publicCardPacksCount: null | number,
    isAuth: boolean
}

export type TLoginReducerActions =
    ReturnType<typeof setAuthUserDataAction> |
    ReturnType<typeof setIsFetching> |
    ReturnType<typeof setAppError>



type TThunk = TBaseThunk<TLoginReducerActions>
type UserLoginDataType = {
    email: string
    password: string
    rememberMe?: boolean
}