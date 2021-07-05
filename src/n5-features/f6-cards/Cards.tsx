import React, {useEffect} from 'react'
import s from './Cards.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import {NavLink} from 'react-router-dom'
import SuperInputText from '../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import {useDispatch, useSelector} from 'react-redux'
import {createCard, getCards} from './cards_reducer'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {TCardData} from '../../n3-api/cards_api'
import {selectCards, selectCardsPack_id} from '../../n2-bll/selectors/cards_selectors'


export const Cards = () => {

    const dispatch = useDispatch()
    const cardsPack_id = useSelector(selectCardsPack_id)
    const cards = useSelector(selectCards)

    useEffect(() => {
        dispatch(getCards())
    }, [])

    const newCard: TCardData = {
        cardsPack_id,
        question: 'Did you complete rating show as well?? :)',
        answer: 'Dunno, let\'s see...) __(^_^)__',
        grade: 3
    }

    const addCard = () => {
        dispatch(createCard(newCard))
    }

    console.log(cards)

    return (
        <div className={s.container}>
            <div className={s.cardsContainer}>
                <div className={s.title}>
                    <NavLink to={PATH.CARD_DECKS} className={s.arrow}>&larr;</NavLink>
                    <h2>Pack Name</h2>
                </div>
                <div className={s.search}>
                    <SuperInputText className={s.searchBar} placeholder={'Search'}/>
                    <SuperButton onClick={addCard}>Add new card</SuperButton>
                </div>
                <div className={s.table}>
                    <div className={s.card}>
                        <div>Question</div>
                        <div>Answer</div>
                        <div className={s.cardInfo}>
                            <div>Last Updated</div>
                            <div>Grade</div>
                        </div>
                    </div>
                    {cards.map(card => <Card key={card._id}
                                             question={card.question}
                                             answer={card.answer}
                                             rating={card.rating}
                                             updatedAt={card.updated}/>)}

                </div>
                <div className={s.paginator}>
                    1 2 3 4 5 ... 5 Show: 10 Cards per page
                </div>
            </div>
        </div>
    )
}

type TCardProps = {
    question: string
    answer: string
    updatedAt: string,
    rating: number
}

const Card: React.FC<TCardProps> = ({answer,question,updatedAt,rating}) => {
    return (
        <div className={s.card}>
            <div className={s.qaSections}>{question}</div>
            <div className={s.qaSections}>{answer}</div>
            <div className={s.cardInfo}>
                <div>{updatedAt.slice(0, 16)}</div>
                <Rating rating={rating}/>
            </div>
        </div>
    )
}

const Rating: React.FC<{rating: number}> =({rating}) => {
    return (
        <div>
            {rating < 1 && <span>&#9734;&#9734;&#9734;&#9734;&#9734;</span>}
            {rating < 2 && rating >= 1 && <span>&#9733;&#9734;&#9734;&#9734;&#9734;</span>}
            {rating < 3 && rating >= 2 && <span>&#9733;&#9733;&#9734;&#9734;&#9734;</span>}
            {rating < 4 && rating >= 3 && <span>&#9733;&#9733;&#9733;&#9734;&#9734;</span>}
            {rating < 5 && rating >= 4 && <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>}
            {rating <= 6 && rating >= 5 && <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>}
        </div>
    )
}