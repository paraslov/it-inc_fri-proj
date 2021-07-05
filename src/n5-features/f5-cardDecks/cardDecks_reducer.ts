import {TAppState, TBaseThunk} from '../../n2-bll/store'
import {CardDecks, cardDecksAPI, CardsParams} from "../../n3-api/card-decks_api";
import {_setAppError, setAppError} from "../../n1-app/a1-app/app_reducer";
import {Dispatch} from "redux";

//* =============================================================== Initial state ===================================>>
const initState: CardDecks = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 1,
    maxCardsCount: 10,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0,
}

export const cardDecksReducer = (state: TState = initState, action: TCardDecksReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/cardDecksReducer/SET_CARD_DECKS':
            return {
                ...state,
                ...action.decks
            }
        case 'para-slov/cardDecksReducer/SET_MIN_MAX_VALUES':
            return {
                ...state,
                minCardsCount: action.min,
                maxCardsCount: action.max
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setCardDecksAction = (decks: any) => ({type: 'para-slov/cardDecksReducer/SET_CARD_DECKS', decks} as const)
export const _setMinMaxValues = (min: number, max: number) => ({type: 'para-slov/cardDecksReducer/SET_MIN_MAX_VALUES', min,max} as const)

//* =============================================================== Thunk creators ==================================>>
export const getCardDecksThunk = (params: CardsParams = {}):TThunk =>
    (dispatch, getState: () => TAppState) => {
    const state = getState()
        console.log(state)
    cardDecksAPI.getCards(params)
        .then(res => {
            dispatch(_setCardDecksAction(res.data))
        }).catch(error => {
            dispatch(setAppError(error.response.data.error))
    })
}

export const createDeckThunk = (): TThunk => dispatch => {
    const cardsPack = {name: 'Naytin'}
    cardDecksAPI.postCards(cardsPack)
        .then(res =>
            dispatch(getCardDecksThunk())
        )
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
        })
}
export const removeDeckThunk = (id: string): TThunk => dispatch => {
    cardDecksAPI.removeCards(id)
        .then(res => {
                dispatch(getCardDecksThunk())
            })
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
        })
}

export const updateValueThunk = (id: string): TThunk => dispatch => {
    const cardsPack = {_id: id, name: 'Sveta'}
    cardDecksAPI.updateCards(cardsPack)
        .then(res => {
            console.log(res)
            dispatch(getCardDecksThunk())
        })
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
        })
}



//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TCardDecksReducerActions =
    ReturnType<typeof _setCardDecksAction> |
    ReturnType<typeof _setMinMaxValues>

type TThunk = TBaseThunk<TCardDecksReducerActions>
