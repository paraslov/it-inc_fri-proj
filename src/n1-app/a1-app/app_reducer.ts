//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {loginAPI} from '../../n3-api/loginAPI'
import {setAuthUserDataAction} from '../../n5-features/f1-login/login_reducer'

const initState = {
    isFetching: false,
    error: null as ErrorMessageType,
    isInitialized: false,
}

export const appReducer = (state: TState = initState, action: TAppReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/passwordReducer/SET_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'para-slov/passwordReducer/SET_IS_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'para-slov/appReducer/SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
/**
 * Preloader is already created in src/n4-common/c2-Preloader/Preloader.tsx !!
 */
export const setIsFetching = (isFetching: boolean) =>
    ({type: 'para-slov/passwordReducer/SET_IS_FETCHING', isFetching} as const)
export const setIsInitialized = (isInitialized: boolean) =>
    ({type: 'para-slov/passwordReducer/SET_IS_INITIALIZED', isInitialized} as const)
export const setAppError = (error: string | null) => ({type: 'para-slov/appReducer/SET_ERROR', error} as const)

//* =============================================================== Thunk creators ==================================>>

export const initializeApp = (): TThunk => dispatch => {
    dispatch(setIsFetching(true))
    loginAPI.auth()
        .then(res => {
            if (res.status === 200) {
                let {email, _id, name, avatar, publicCardPacksCount} = res.data
                let isAuth = true

                dispatch(setIsFetching(false))
                dispatch(setAuthUserDataAction({email, _id, name, avatar, publicCardPacksCount, isAuth}))
                dispatch(setIsInitialized(true))
            }
        })
        .catch(error => {
            dispatch(setIsInitialized(true))
            dispatch(setIsFetching(false))
        })
}

//* =============================================================== Types ===========================================>>

export type TState = typeof initState
export type ErrorMessageType = string | null
export type TAppReducerActions = ReturnType<typeof setIsFetching>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setAuthUserDataAction>

type TThunk = TBaseThunk<TAppReducerActions>