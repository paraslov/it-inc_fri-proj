//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {loginAPI, LoginResponse} from "../../n3-api/loginAPI";

const initState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    isLogged: false
}

export const loginReducer = (state: TState = initState, action: TLoginReducerActions): TState => {
    switch (action.type) {
        case 'login/LOGIN_USER':
            return {
                ...state,
                ...action.data,
                isLogged: true
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const login = (data: LoginResponse) => ({type: 'login/LOGIN_USER', data} as const)

//* =============================================================== Thunk creators ==================================>>
export const loginThunk = (data: UserDataType): TThunk => dispatch => {
    loginAPI.login(data)
        .then(res => {
            if(res.status === 200) {
                dispatch(login(res.data))
            }else {
                console.log('something went wrong', res)
            }
        }).catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            console.log('Error', {...error})
    })
}

export const registerThunk = (data:UserDataType): TThunk => dispatch => {
    console.log('register')
    loginAPI.register(data)
        .then(res => console.log(res))
        .catch(e => {
            console.log(e)
        })
}

//* =============================================================== Types ===========================================>>
export type TState = typeof initState

export type TLoginReducerActions = ReturnType<typeof login>

type TThunk = TBaseThunk<TLoginReducerActions>
type UserDataType = {
    email: string
    password: string
    rememberMe?: boolean
}