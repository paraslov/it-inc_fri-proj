//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {instance} from "../../n3-api/api";
import {Dispatch} from "redux";

const initState = {
    email: "nya-admin@nya.nya",
    password: "1qazxcvBG",
    error: '',
    isFetching: false,
    rememberMe: false,
    _id: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
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
        case "para-slov/registrationReducer/LOGIN_USER":
            return {
                ...state,
                _id: action.data._id,
                email: action.data.email,
                name: action.data.name,
                avatar: action.data.avatar,
                publicCardPacksCount: action.data.publicCardPacksCount
            }

        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const authRegisterAction = (email: string, password: string, message?: string,) =>
    ({type: 'para-slov/registrationReducer/AUTH-REGISTER', email, password, message} as const)

export const setIsFetchingRegisterAction = (isFetching: boolean) =>
    ({type: 'para-slov/registrationReducer/IS-FETCHING', isFetching} as const)

export const loginUserAction = (data: UserDataType) => ({
    type: 'para-slov/registrationReducer/LOGIN_USER',
    data
} as const)

//* =============================================================== Thunk creators ==================================>>
export const registrationThunk = (email: string, password: string): TThunk => {
    return (dispatch) => {
        usersAPI.registration(email, password)
            .then(() => {
                debugger
                dispatch(authRegisterAction(email, password));
                dispatch(loginMeThunk(email, password))
                dispatch(setIsFetchingRegisterAction(false))
            })
            .catch(error => {
                const message = error.response.data.error
                dispatch(authRegisterAction(email, password, message))
            })

    }
}
export const loginMeThunk = (email: string, password: string): TThunk => {
    return (dispatch: Dispatch) => {
        usersAPI.userLogin(email, password, false)
            .then((res) => {
                let {email, _id, name, avatar, publicCardPacksCount} = res.data
                dispatch(loginUserAction({_id, email, name, avatar, publicCardPacksCount}))
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
    | LoginUserActionType

type AuthRegisterActionType = ReturnType<typeof authRegisterAction>
type SetIsFetchingRegisterActionType = ReturnType<typeof setIsFetchingRegisterAction>
type LoginUserActionType = ReturnType<typeof loginUserAction>


type TThunk = TBaseThunk<TRegistrationReducerActions>


export const usersAPI = {
    registration(email: string, password: string) {
        return instance.post<RegistrationType>('auth/register', {email, password})
    },
    userLogin(email: string, password: string, rememberMe: boolean) {
        return instance.post<UserDataType>('/auth/login', {email, password, rememberMe})
    }
}

type RegistrationType = {
    addedUser: {}
    error?: string,
}
export type UserDataType = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number,
}