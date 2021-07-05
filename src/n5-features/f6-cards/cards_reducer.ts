import {TBaseThunk} from '../../n2-bll/store'
import {cardsAPI} from '../../n3-api/cards_api'

//* =============================================================== Initial state ===================================>>
const initState = {
    cardsPack_id: '',
}

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
export const getCards = (): TThunk => dispatch => {
    cardsAPI.getCards({cardsPack_id: '60e3022aa8b1610004c03ce1'})
        .then(data => {
            console.log(data)
        })
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TCardsReducerActions = ReturnType<typeof _someCardsAction>

type TThunk = TBaseThunk<TCardsReducerActions>


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