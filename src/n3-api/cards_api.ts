import {instance} from './api'


export const cardsAPI = {
    getCard(cardsParams: TGetCardParams) {
        return instance.get('cards/card', {params: {...cardsParams}})
    },
    createCard(cardData: TCardData) {
        return instance.post('cards/card', {...cardData})
    },
    deleteCard(_id: string) {
        return instance.delete('cards/card', {params: {_id}})
    },
    updateCard(cardData: TCardData) {
        return instance.put('cards/card', {...cardData})
    },
}

type TGetCardParams = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: string
    max?: string
    sortCards?: string
    page?: string
    pageCount?: string
}

export type TCardData = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}