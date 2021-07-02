//* =============================================================== Initial state ===================================>>
import {setAppError, setIsFetching, setIsInitialized} from '../../n1-app/a1-app/app_reducer';
import {TBaseThunk} from '../../n2-bll/store'
import {loginAPI} from '../../n3-api/loginAPI';
import {setUserData} from '../f3-profile/progile_reducer';

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
                let {
                    email,
                    _id,
                    name,
                    avatar,
                    publicCardPacksCount
                } = res.data

                dispatch(setIsFetching(false))
                dispatch(setIsInitialized(true))
                dispatch(setIsAuth(true))
                dispatch(setUserData({email, _id, name, avatar, publicCardPacksCount}))
            }
        }).catch(error => {
        dispatch(setIsInitialized(true))
        dispatch(setIsFetching(false))

    })
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

export const registerThunk = (data: UserLoginDataType): TThunk => dispatch => {
    loginAPI.register(data)
        .then(res => console.log(res))
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
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