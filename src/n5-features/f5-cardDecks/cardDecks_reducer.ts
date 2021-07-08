import {TAppState, TBaseThunk} from '../../n2-bll/store'
import {cardDecksAPI, CardsParams, Pack} from '../../n3-api/card-decks_api'
import {setIsFetching} from '../../n1-app/a1-app/app_reducer'
import {thunkErrorHandler} from '../../n4-common/helpers/thunk-error'
import {thunkRequestHelper} from '../../n4-common/helpers/thunkRequestHelper'

//* =============================================================== Initial state ===================================>>
const initState: DecksStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 1,
    maxCardsCount: 10,
    page: 0,
    pageCount: 10,
    token: '',
    tokenDeathTime: 0,
    sortPacks: '',
    packName: ''
}

export const cardDecksReducer = (state: DecksStateType = initState, action: TCardDecksReducerActions): DecksStateType => {
    switch (action.type) {
        case 'para-slov/cardDecksReducer/SET_CARD_DECKS':
        case 'para-slov/cardDecksReducer/UPDATE_VALUES':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setCardDecksAction = (payload: any) => ({
    type: 'para-slov/cardDecksReducer/SET_CARD_DECKS',
    payload
} as const)
export const _updateValues = (payload: SetValuesType) => ({
    type: 'para-slov/cardDecksReducer/UPDATE_VALUES',
    payload
} as const)

//* =============================================================== Thunk creators ==================================>>
export const getCardDecksThunk = (params: CardsParams = {}): TThunk => (dispatch,
                                                                        getState: () => TAppState) => {
    dispatch(setIsFetching(true))
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
            console.log(res.data)
            dispatch(_setCardDecksAction(res.data))
            dispatch(setIsFetching(false))
        }).catch(error => {
        thunkErrorHandler(error, dispatch)
    })
}
const cardDecksRequestHelper = thunkRequestHelper(getCardDecksThunk)
export const createDeckThunk = (): TThunk => dispatch => {
    const cardsPack = {name: 'Test Deck'}
    cardDecksRequestHelper(cardDecksAPI.postCards, dispatch, cardsPack)
}
export const removeDeckThunk = (id: string): TThunk => dispatch => {
    cardDecksRequestHelper(cardDecksAPI.removeCards, dispatch, id)
}

export const updateValueThunk = (id: string): TThunk => dispatch => {
    const cardsPack = {_id: id, name: 'Updated Deck'}
    cardDecksRequestHelper(cardDecksAPI.updateCards, dispatch, cardsPack)
}

//* =============================================================== Types ===========================================>>

export type DecksStateType = {
    packName: string
    cardPacks: Array<Pack>
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    sortPacks: string,
    token: string,
    tokenDeathTime: number
}
export type SetValuesType = {
    minCardsCount?: number,
    maxCardsCount?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    packName?: string
}
export type TCardDecksReducerActions =
    ReturnType<typeof _setCardDecksAction> |
    ReturnType<typeof _updateValues> |
    ReturnType<typeof setIsFetching>

type TThunk = TBaseThunk<TCardDecksReducerActions>