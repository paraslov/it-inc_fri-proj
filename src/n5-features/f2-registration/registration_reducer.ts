//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {instance} from "../../n3-api/api";
import {Dispatch} from "redux";

const initState = {
    email: "nya-admin@nya.nya",
    password: "1qazxcvBG",
    error: ''
}

export const registrationReducer = (state: TState = initState, action: TRegistrationReducerActions): TState => {
    switch (action.type) {
        case "para-slov/registrationReducer/AUTH-REGISTER":
            return {
                ...state,
                email: action.email,
                password: action.password,
                error: action.error as string
            }

        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const authRegisterAction = (email: string, password: string, error?: string) =>
    ( {type: 'para-slov/registrationReducer/AUTH-REGISTER', email, password, error: error} as const)

//* =============================================================== Thunk creators ==================================>>
export const registrationThunk = (email: string, password: string): TThunk => {
    return (dispatch: Dispatch) => {
        usersAPI.registration(email, password)
            .then( res => {
                    dispatch(authRegisterAction(email, password))
            })
            .catch(error => {
                const  message = error.response.data.error
                dispatch(authRegisterAction(email, password, message))
            })

    }
}


//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TRegistrationReducerActions =
    AuthRegisterActionType

type AuthRegisterActionType = ReturnType<typeof authRegisterAction>

type TThunk = TBaseThunk<TRegistrationReducerActions>


export const usersAPI = {
    registration(email: string, password: string) {
        return instance.post('auth/register', {email, password})
    }
}

type RegistrationType = {
    error?: string,
    email?: string
}