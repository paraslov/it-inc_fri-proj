//* ============================================================= Initial state =====================================>>
import {TBaseThunk} from '../../n2-bll/store'

const initState = {}

export const profileReducer = (state: TState = initState, action: TProfileReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/profileReducer/SOME_ACTION':
            return state
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _someProfileAction = () => ({type: 'para-slov/profileReducer/SOME_ACTION'} as const)

//* =============================================================== Thunk creators ==================================>>
export const profileThunk = (): TThunk => dispatch => {
    dispatch(_someProfileAction())
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TProfileReducerActions = ReturnType<typeof _someProfileAction>

type TThunk = TBaseThunk<TProfileReducerActions>
