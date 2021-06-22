//* ============================================================= Initial state =====================================>>
import {TBaseThunk} from '../../n2-bll/store'

const initState = {}

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
export const passwordThunk = (): TThunk => dispatch => {
    dispatch(_somePasswordAction())
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TPasswordReducerActions = ReturnType<typeof _somePasswordAction>

type TThunk = TBaseThunk<TPasswordReducerActions>
