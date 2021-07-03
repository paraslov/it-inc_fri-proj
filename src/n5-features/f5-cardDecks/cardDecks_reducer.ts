import {TBaseThunk} from '../../n2-bll/store'

//* =============================================================== Initial state ===================================>>
const initState = {}

export const cardDecksReducer = (state: TState = initState, action: TCardDecksReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/cardDecksReducer/SOME_ACTION':
            return state
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _someCardDecksAction = () => ({type: 'para-slov/cardDecksReducer/SOME_ACTION'} as const)

//* =============================================================== Thunk creators ==================================>>
export const cardDecksReducerThunk = (): TThunk => dispatch => {
    dispatch(_someCardDecksAction())
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TCardDecksReducerActions = ReturnType<typeof _someCardDecksAction>

type TThunk = TBaseThunk<TCardDecksReducerActions>