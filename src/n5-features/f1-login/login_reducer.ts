//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'

const initState = {}

export const loginReducer = (state: TState = initState, action: TLoginReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/loginReducer/SOME_ACTION':
            return state
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _someLoginAction = () => ({type: 'para-slov/loginReducer/SOME_ACTION'} as const)

//* =============================================================== Thunk creators ==================================>>
export const loginThunk = (): TThunk => dispatch => {
    dispatch(_someLoginAction())
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TLoginReducerActions = ReturnType<typeof _someLoginAction>

type TThunk = TBaseThunk<TLoginReducerActions>
