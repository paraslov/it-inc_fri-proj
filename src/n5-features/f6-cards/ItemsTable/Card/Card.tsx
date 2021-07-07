import React from 'react'
import s from '../ItemsTable.module.css'
import {Rating} from '../../../../n4-common/components/c4-Rating/Rating'
import SuperButton from '../../../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {TCardUpdateData} from '../../../../n3-api/cards_api'

type TCardProps = {
    cardId: string
    question: string
    answer: string
    updatedAt: string
    grade: number
    isUsersPack: boolean
    isFetching: boolean
    deleteCardCallback: (cardId: string) => void
    updateCardCallback: (cardData: TCardUpdateData) => void
}
export const Card: React.FC<TCardProps> = (props) => {
    const {
        answer, cardId, question, updatedAt, grade, isUsersPack, isFetching, deleteCardCallback, updateCardCallback
    } = props
    const editedCard: TCardUpdateData = {
        _id: cardId,
        question: 'Card is successfully updated? :)',
        answer: 'yeahs! The card is! |=^_^=|',
        grade: 2
    }

    return (
        <div className={s.card}>
            <div className={s.qaSections}>{question}</div>
            <div className={s.qaSections}>{answer}</div>
            <div className={`${s.cardInfo} ${isUsersPack && s.cardInfoWithActions}`}>
                <div>{updatedAt.slice(0, 16)}</div>
                <Rating rating={grade}/>
                {isUsersPack && <div>
                    <SuperButton className={s.actionsBtn} disabled={isFetching}
                                 onClick={() => updateCardCallback(editedCard)}>Edit</SuperButton>
                    <SuperButton className={s.actionsBtn} disabled={isFetching} red
                                 onClick={() => deleteCardCallback(cardId)}>Delete</SuperButton>
                </div>}
            </div>
        </div>
    )
}