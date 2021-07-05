import {TBaseThunk} from '../../n2-bll/store'
import {cardsAPI, TCardData, TGetCardsResponseData} from '../../n3-api/cards_api'

//* =============================================================== Initial state ===================================>>
const initState = {
    cardsPack_id: '60e3022aa8b1610004c03ce1',
    cards: [] as TCardType[],
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    packUserId: '',
    page: 1,
    pageCount: 1,
    token: '',
    tokenDeathTime: 0,
}

export const cardsReducer = (state: TState = initState, action: TCardsReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/cardsReducer/SET_CARDS_STATE':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setCardsState = (payload: TGetCardsResponseData) =>
    ({type: 'para-slov/cardsReducer/SET_CARDS_STATE', payload} as const)

//* =============================================================== Thunk creators ==================================>>
export const getCards = (): TThunk => (dispatch, getState) => {
    cardsAPI.getCards({cardsPack_id: getState().cards.cardsPack_id})
        .then(data => {
            console.log(data)
            dispatch(_setCardsState(data))
        })
}
export const createCard = (cardData: TCardData): TThunk => (dispatch) => {

    cardsAPI.createCard(cardData)
        .then(data => {
            console.log(data)
            dispatch(getCards())
        })
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TCardsReducerActions = ReturnType<typeof _setCardsState>

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