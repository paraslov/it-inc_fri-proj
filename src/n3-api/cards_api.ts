import {instance} from './api'


export const cardsAPI = {
    getCards(cardsParams: TGetCardParams) {
        return instance.get('cards/card', {params: {...cardsParams}}).then(res => res.data)
    },
    createCard(cardData: TCardData) {
        return instance.post('cards/card', {...cardData}).then(res => res.data)
    },
    deleteCard(_id: string) {
        return instance.delete('cards/card', {params: {_id}}).then(res => res.data)
    },
    updateCard(cardData: TCardData) {
        return instance.put('cards/card', {...cardData}).then(res => res.data)
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