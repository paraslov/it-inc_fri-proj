import {TBaseThunk} from '../../n2-bll/store'
import {cardsAPI, TCardData, TCardUpdateData, TGetCardParams, TGetCardsResponseData} from '../../n3-api/cards_api'
import {setAppError, setIsFetching} from '../../n1-app/a1-app/app_reducer'

//* =============================================================== Initial state ===================================>>
const initState = {
    cardsPack_id: '60e3022aa8b1610004c03ce1',
    cardAnswer: undefined as string | undefined,
    cardQuestion: undefined as string | undefined,
    sortCards: undefined as string | undefined,
    min: undefined as string | undefined,
    max: undefined as string | undefined,
    cards: [] as TCardType[],
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    packUserId: '',
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0,
}

export const cardsReducer = (state: TState = initState, action: TCardsReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/cardsReducer/SET_CARDS_STATE':
            return {...state, ...action.payload}
        case 'para-slov/cardsReducer/SET_GET_REQUEST_PARAMS':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setCardsState = (payload: TGetCardsResponseData) =>
    ({type: 'para-slov/cardsReducer/SET_CARDS_STATE', payload} as const)
export const setGetRequestParams = (payload: TSetRequestParams) =>
    ({type: 'para-slov/cardsReducer/SET_GET_REQUEST_PARAMS', payload} as const)

//* =============================================================== Thunk creators ==================================>>
export const getCards = (): TThunk => (dispatch, getState) => {
    dispatch(setIsFetching(true))
    const cards = getState().cards
    const newCardParams: TGetCardParams = {
        cardsPack_id: cards.cardsPack_id,
        pageCount: cards.pageCount.toString(),
        cardQuestion: cards.cardQuestion,
        cardAnswer: cards.cardAnswer,
        sortCards: cards.sortCards,
        page: cards.page.toString(),
    }
    cardsAPI.getCards(newCardParams)
        .then(data => {
            console.log(data)
            dispatch(_setCardsState(data))
            dispatch(setIsFetching(false))
        })
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
            dispatch(setIsFetching(false))
        })
}
export const createCard = (cardData: TCardData): TThunk => dispatch => {
    dispatch(setIsFetching(true))
    cardsAPI.createCard(cardData)
        .then(data => {
            console.log(data)
            dispatch(setIsFetching(false))
            dispatch(getCards())
        })
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
            dispatch(setIsFetching(false))
        })
}
export const deleteCard = (cardId: string): TThunk => dispatch => {
    dispatch(setIsFetching(true))
    cardsAPI.deleteCard(cardId)
        .then(data => {
            console.log(data)
            dispatch(setIsFetching(false))
            dispatch(getCards())
        })
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
            dispatch(setIsFetching(false))
        })
}
export const updateCard = (cardData: TCardUpdateData): TThunk => dispatch => {
    dispatch(setIsFetching(true))
    cardsAPI.updateCard(cardData)
        .then(data => {
            console.log(data)
            dispatch(setIsFetching(false))
            dispatch(getCards())
        })
        .catch(error => {
            dispatch(setAppError(error.response.data.error))
            dispatch(setIsFetching(false))
        })
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TCardsReducerActions = ReturnType<typeof _setCardsState>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setGetRequestParams>

type TThunk = TBaseThunk<TCardsReducerActions>

export type TCardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type TSetRequestParams = {
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
    min?: string
    max?: string
    sortCards?: string
    page?: number
    pageCount?: number
}


// cardsCount: 0
// created: "2021-07-05T12:59:22.538Z"
// grade: 0
// more_id: "60d6ab539fa2b22e6cdcf70c"
// name: "Para Slov"
// path: "/def"
// private: false
// rating: 0
// shots: 0
// type: "pack"
// updated: "2021-07-05T12:59:22.538Z"
// user_id: "60d6ab539fa2b22e6cdcf70c"
// user_name: "JoyMe"
// __v: 0
// _id: "60e3022aa8b1610004c03ce1"