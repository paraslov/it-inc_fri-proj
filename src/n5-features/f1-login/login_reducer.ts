//* =============================================================== Initial state ===================================>>
import {setAppError, setIsFetching, setIsInitialized} from '../../n1-app/a1-app/app_reducer'
import {TAppState, TBaseThunk} from '../../n2-bll/store'
import {loginAPI} from '../../n3-api/loginAPI'
import {setUserData} from '../f3-profile/progile_reducer'
import {ThunkDispatch} from 'redux-thunk'

const initState = {
    isAuth: false
}

export const loginReducer = (state: TState = initState, action: TLoginReducerActions): TState => {
    switch (action.type) {
        case 'login/LOGIN_USER':
            return {
                ...state,
                isAuth: action.isAuth,
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const setIsAuth = (isAuth: boolean) => ({type: 'login/LOGIN_USER', isAuth} as const)

//* =============================================================== Thunk creators ==================================>>

const authHelper = (apiMethod: (data?: any) => Promise<any>, dispatch: ThunkDispatch<TAppState, any, TLoginReducerActions>,
                    type: 'login' | 'auth', data?: any) => {
    dispatch(setIsFetching(true))
    apiMethod(data).then(res => {
        let {email, _id, name, avatar, publicCardPacksCount} = res.data
        dispatch(setIsFetching(false))
        dispatch(setIsInitialized(true))
        dispatch(setIsAuth(true))
        dispatch(setUserData({email, _id, name, avatar, publicCardPacksCount}))
    }).catch(error => {
        type === 'login' ? dispatch(setAppError(error.response.data.error)) : dispatch(setIsInitialized(true))
        dispatch(setIsFetching(false))
    })
}

export const loginThunk = (data: UserLoginDataType): TThunk => dispatch => {
    authHelper(loginAPI.login, dispatch, 'login', data)
    // dispatch(setIsFetching(true))
    // loginAPI.login(data)
    //     .then(res => {
    //             let {email,
    //                 _id,
    //                 name,
    //                 avatar,
    //                 publicCardPacksCount} = res.data
    //             dispatch(setIsFetching(false))
    //             dispatch(setIsInitialized(true))
    //             dispatch(setIsAuth(true))
    //             dispatch(setUserData({email, _id, name, avatar, publicCardPacksCount}))
    //     }).catch(error => {
    //         dispatch(setAppError(error.response.data.error))
    //         dispatch(setIsFetching(false))
    // })
}
export const authThunk = (): TThunk => dispatch => {
    authHelper(loginAPI.auth, dispatch, 'auth')
    // dispatch(setIsFetching(true))
    // loginAPI.auth()
    //     .then(res => {
    //             let {email,
    //                 _id,
    //                 name,
    //                 avatar,
    //                 publicCardPacksCount} = res.data
    //
    //             dispatch(setIsFetching(false))
    //             dispatch(setIsInitialized(true))
    //             dispatch(setIsAuth(true))
    //             dispatch(setUserData({email, _id, name, avatar, publicCardPacksCount}))
    //     }).catch(error => {
    //         dispatch(setIsInitialized(true))
    //         dispatch(setIsFetching(false))
    // })
}
export const logoutThunk = (): TThunk => dispatch => {
    loginAPI.logout()
        .then(res => {
            if (res.status === 200) {
                let email = null
                let _id = null
                let name = ''
                let avatar = ''
                let publicCardPacksCount = null

                dispatch(setIsAuth(false))
                dispatch(setUserData({email, _id, name, avatar, publicCardPacksCount}))
            }
        }).catch(error => {
        dispatch(setAppError(error.response.data.error))
        dispatch(setIsFetching(false))
    })
}

//* =============================================================== Types ===========================================>>
export type TState = typeof initState


export type TLoginReducerActions =
    ReturnType<typeof setIsAuth> |
    ReturnType<typeof setIsFetching> |
    ReturnType<typeof setIsInitialized> |
    ReturnType<typeof setUserData>


type TThunk = TBaseThunk<TLoginReducerActions>
type UserLoginDataType = {
    email: string
    password: string
    rememberMe?: boolean
}