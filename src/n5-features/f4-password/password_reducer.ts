//* ============================================================= Initial state =====================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {passwordAPI} from '../../n3-api/password_api'

const initState = {
    restorationEmail: '',
    isRestoreSuccess: false,
    isFetching: false,
    isSetNewPasswordSuccess: false
}

export const passwordReducer = (state: TState = initState, action: TPasswordReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/passwordReducer/SET_RESTORE_SUCCESS':
            return {...state, isRestoreSuccess: action.isRestoreSuccess}
        case 'para-slov/passwordReducer/SET_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'para-slov/passwordReducer/SET_RESTORATION_EMAIL':
            return {...state, restorationEmail: action.restorationEmail}
        case 'para-slov/passwordReducer/SET_NEW_PASSWORD_SUCCESS':
            return {...state, isSetNewPasswordSuccess: action.isSetNewPasswordSuccess}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setIsRestoreSuccess = (isRestoreSuccess: boolean) =>
    ({type: 'para-slov/passwordReducer/SET_RESTORE_SUCCESS', isRestoreSuccess} as const)
export const _setIsSetNewPasswordSuccess = (isSetNewPasswordSuccess: boolean) =>
    ({type: 'para-slov/passwordReducer/SET_NEW_PASSWORD_SUCCESS', isSetNewPasswordSuccess} as const)
export const _setIsFetching = (isFetching: boolean) =>
    ({type: 'para-slov/passwordReducer/SET_IS_FETCHING', isFetching} as const)
export const _setRestorationEmail = (restorationEmail: string) =>
    ({type: 'para-slov/passwordReducer/SET_RESTORATION_EMAIL', restorationEmail} as const)

//* =============================================================== Thunk creators ==================================>>
export const restorePassword = (email: string): TThunk => dispatch => {
    dispatch(_setIsFetching(true))
    passwordAPI.restorePassword(email)
        .then(data => {
            console.log(data)
            dispatch(_setIsRestoreSuccess(true))
            dispatch(_setIsFetching(false))
            dispatch(_setRestorationEmail(email))
        })
        .catch(error => {
            console.warn(error.response.data.error)
            alert(error.response.data.error)
            dispatch(_setIsFetching(false))
        })
}
export const setNewPassword = (password: string, token: string): TThunk => dispatch => {
    dispatch(_setIsFetching(true))
    passwordAPI.setNewPassword({password, resetPasswordToken: token})
        .then(data => {
            console.log(data)
            dispatch(_setIsRestoreSuccess(false))
            dispatch(_setIsFetching(false))
            dispatch(_setIsSetNewPasswordSuccess(true))
            // to back to false setTimeout used, since login page is not ready yet
            // todo: refactor setTimeout and replace it with dispatch in Login page.
            setTimeout(() => dispatch(_setIsSetNewPasswordSuccess(false)), 1000)
        })
        .catch(error => {
            console.warn(error.response.data.error)
            alert(error.response.data.error)
            dispatch(_setIsFetching(false))
        })
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TPasswordReducerActions = ReturnType<typeof _setIsRestoreSuccess>
    | ReturnType<typeof _setIsFetching>
    | ReturnType<typeof _setRestorationEmail>
    | ReturnType<typeof _setIsSetNewPasswordSuccess>


type TThunk = TBaseThunk<TPasswordReducerActions>
