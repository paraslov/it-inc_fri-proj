import {TBaseThunk} from '../../n2-bll/store'

//* =============================================================== Initial state ===================================>>
const initState = {}

export const cardsReducer = (state: TState = initState, action: TCardsReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/cardsReducer/SOME_ACTION':
            return state
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _someCardsAction = () => ({type: 'para-slov/cardsReducer/SOME_ACTION'} as const)

//* =============================================================== Thunk creators ==================================>>
export const cardsReducerThunk = (): TThunk => dispatch => {
    dispatch(_someCardsAction())
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TCardsReducerActions = ReturnType<typeof _someCardsAction>

type TThunk = TBaseThunk<TCardsReducerActions>