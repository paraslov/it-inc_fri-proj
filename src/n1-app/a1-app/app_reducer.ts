//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'

const initState = {}

export const appReducer = (state: TState = initState, action: TAppReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/appReducer/SOME_ACTION':
            return state
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _someAppAction = () => ({type: 'para-slov/appReducer/SOME_ACTION'} as const)

//* =============================================================== Thunk creators ==================================>>
export const appThunk = (): TThunk => dispatch => {
    dispatch(_someAppAction())
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TAppReducerActions = ReturnType<typeof _someAppAction>

type TThunk = TBaseThunk<TAppReducerActions>
