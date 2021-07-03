//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {loginAPI} from '../../n3-api/loginAPI'

const initState = {
    email: 'nya-admin@nya.nya',
    password: '1qazxcvBG',
    error: '',
    isFetching: false,
}


export const registrationReducer = (state: TState = initState, action: TRegistrationReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/registrationReducer/AUTH-REGISTER':
            return {
                ...state,
                email: action.email,
                password: action.password,
                error: action.message as string,
            }
        case 'para-slov/registrationReducer/IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const authRegisterAction = (email: string, password: string, message?: string,) =>
    ({type: 'para-slov/registrationReducer/AUTH-REGISTER', email, password, message} as const)

export const setIsFetchingRegisterAction = (isFetching: boolean) =>
    ({type: 'para-slov/registrationReducer/IS-FETCHING', isFetching} as const)

//* =============================================================== Thunk creators ==================================>>
export const registrationThunk = (email: string, password: string): TThunk => {
    return (dispatch) => {
        loginAPI.registration(email, password)
            .then(() => {
                dispatch(authRegisterAction(email, password))
                dispatch(setIsFetchingRegisterAction(true))
            })
            .catch(error => {
                debugger
                const message = error.response.data.error
                dispatch(authRegisterAction(email, password, message))
            })
    }
}


//* =============================================================== Types ===========================================>>
type TState = initStateType

type initStateType = typeof initState

export type TRegistrationReducerActions =
    AuthRegisterActionType
    | SetIsFetchingRegisterActionType

type AuthRegisterActionType = ReturnType<typeof authRegisterAction>
type SetIsFetchingRegisterActionType = ReturnType<typeof setIsFetchingRegisterAction>


type TThunk = TBaseThunk<TRegistrationReducerActions>