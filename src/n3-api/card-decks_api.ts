import {instance} from "./api";



export const cardDecksAPI = {
    getCards(cardsParams: CardsParams) {
        return instance.get<ResponseCards>('cards/pack', {params: {...cardsParams}})
    }
}

type Pack = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: Date
    updated: Date
    more_id: string
    _v: number
}

type ResponseCards = {
    cardPacks: Array<Pack>
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    token: string,
    tokenDeathTime: number
}

interface CardsParams {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: string
}
