import {TBaseThunk} from '../../n2-bll/store'
import {CardDecks, cardDecksAPI} from "../../n3-api/card-decks_api";

//* =============================================================== Initial state ===================================>>
const initState: CardDecks = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0
}

export const cardDecksReducer = (state: TState = initState, action: TCardDecksReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/cardDecksReducer/SET_CARD_DECKS':
            return {
                ...state,
                ...action.decks
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setCardDecksAction = (decks: any) => ({type: 'para-slov/cardDecksReducer/SET_CARD_DECKS', decks} as const)

//* =============================================================== Thunk creators ==================================>>
export const cardDecksReducerThunk = (): TThunk => dispatch => {
    cardDecksAPI.getCards({min: 1, max: 5, sortPacks: 0})
        .then(res => {
            dispatch(_setCardDecksAction(res.data))
        })
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TCardDecksReducerActions = ReturnType<typeof _setCardDecksAction>

type TThunk = TBaseThunk<TCardDecksReducerActions>