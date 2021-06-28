//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {instance} from '../../n3-api/api';

const initState = {
    email: "nya-admin@nya.nya",
    password: "1qazxcvBG",
    error: '',
    isFetching: false,
}


export const registrationReducer = (state: TState = initState, action: TRegistrationReducerActions): TState => {
    switch (action.type) {
        case "para-slov/registrationReducer/AUTH-REGISTER":
            return {
                ...state,
                email: action.email,
                password: action.password,
                error: action.message as string,
            }
        case "para-slov/registrationReducer/IS-FETCHING":
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
        usersAPI.registration(email, password)
            .then(() => {
                dispatch(authRegisterAction(email, password));
                dispatch(setIsFetchingRegisterAction(true))
            })
            .catch(error => {
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


export const usersAPI = {
    registration(email: string, password: string) {
        return instance.post<RegistrationType>('auth/register', {email, password})
    }
}

type RegistrationType = {
    addedUser: {}
    error?: string,
}
