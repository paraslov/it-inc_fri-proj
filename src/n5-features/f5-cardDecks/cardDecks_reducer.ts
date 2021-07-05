import {TAppState, TBaseThunk} from '../../n2-bll/store'
import {CardDecks, cardDecksAPI, CardsParams} from "../../n3-api/card-decks_api";
import {setAppError} from "../../n1-app/a1-app/app_reducer";



//* =============================================================== Initial state ===================================>>
const initState: CardDecks & {packName: string} = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 1,
    maxCardsCount: 10,
    page: 1,
    pageCount: 10,
    token: '',
    tokenDeathTime: 0,
    sortPacks: '',
    packName: ''
}

export const cardDecksReducer = (state: TState = initState, action: TCardDecksReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/cardDecksReducer/SET_CARD_DECKS':
            return {
                ...state,
                ...action.decks
            }
        case 'para-slov/cardDecksReducer/SET_RANGE_VALUES':
            return {
                ...state,
                maxCardsCount: action.max,
                minCardsCount: action.min
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setCardDecksAction = (decks: any) => ({type: 'para-slov/cardDecksReducer/SET_CARD_DECKS', decks} as const)
export const _setRangeValues = (min: number, max: number) => ({type: 'para-slov/cardDecksReducer/SET_RANGE_VALUES', min,max} as const)

//* =============================================================== Thunk creators ==================================>>
export const getCardDecksThunk = (params: CardsParams = {}):TThunk =>
    (dispatch, getState: () => TAppState) => {
    const cardDecks = getState().cardDecks

        const cardsParamsModel: CardsParams = {
            packName: cardDecks.packName,
            min: cardDecks.minCardsCount,
            max: cardDecks.maxCardsCount,
            sortPacks: cardDecks.sortPacks,
            page: cardDecks.page,
            pageCount: cardDecks.pageCount,
            ...params
        }
    cardDecksAPI.getCards(cardsParamsModel)
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
    ReturnType<typeof _setRangeValues>

type TThunk = TBaseThunk<TCardDecksReducerActions>
