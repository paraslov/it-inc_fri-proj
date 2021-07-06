import {TAppState} from '../store'


export const selectCardsPack_id = (state: TAppState) => state.cards.cardsPack_id
export const selectCards = (state: TAppState) => state.cards.cards
export const selectPackUserId = (state: TAppState) => state.cards.packUserId
export const selectPageCount = (state: TAppState) => state.cards.pageCount