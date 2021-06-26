//* ============================================================= Initial state =====================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {passwordAPI} from '../../n3-api/password_api'

const initState = {
    restoreSuccess: false
}

export const passwordReducer = (state: TState = initState, action: TPasswordReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/passwordReducer/SOME_ACTION':
            return state
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _somePasswordAction = () => ({type: 'para-slov/passwordReducer/SOME_ACTION'} as const)

//* =============================================================== Thunk creators ==================================>>
export const restorePassword = (email: string): TThunk => dispatch => {
    passwordAPI.restorePassword(email)
        .then(data => {
            console.log(data)
        })
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TPasswordReducerActions = ReturnType<typeof _somePasswordAction>

type TThunk = TBaseThunk<TPasswordReducerActions>
