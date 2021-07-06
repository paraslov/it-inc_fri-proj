import React, {useEffect} from 'react'
import s from './Cards.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import {NavLink} from 'react-router-dom'
import SuperInputText from '../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import {useDispatch, useSelector} from 'react-redux'
import {createCard, deleteCard, getCards} from './cards_reducer'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {TCardData} from '../../n3-api/cards_api'
import {selectCards, selectCardsPack_id, selectPackUserId} from '../../n2-bll/selectors/cards_selectors'
import {selectUser_id} from '../../n2-bll/selectors/profile_selectors'
import {Rating} from '../../n4-common/components/c4-Rating/Rating'
import {selectIsFetching} from '../../n2-bll/selectors/app_selectors'
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader'


export const Cards = () => {
    //* ==================================  Data  =================================================================>>
    const dispatch = useDispatch()
    const isFetching = useSelector(selectIsFetching)
    const cardsPack_id = useSelector(selectCardsPack_id)
    const cards = useSelector(selectCards)
    const packUserId = useSelector(selectPackUserId)
    const user_id = useSelector(selectUser_id)
    // check if it's current user's deck of cards or not and renders Actions, edit and delete according to result
    const isUsersPack = packUserId === user_id

    useEffect(() => {
        dispatch(getCards())
    }, [])

    const newCard: TCardData = {
        cardsPack_id,
        question: 'card to delete',
        answer: 'no card, no answer.. =0_0=',
        grade: 4
    }

    const addCard = () => {
        dispatch(createCard(newCard))
    }
    const deleteCardCallback = (cardId: string) => {
        dispatch(deleteCard(cardId))
    }


    console.log(cards)

    return (
        <div className={s.container}>
            <div className={s.cardsContainer}>
                {isFetching && <Preloader left={'40%'} top={'40%'} size={'100px'}/>}
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
                        <div className={`${s.cardInfo} ${isUsersPack && s.cardInfoWithActions}`}>
                            <div>Last Updated</div>
                            <div className={s.gradeTitle}>Grade</div>
                            {isUsersPack && <div className={s.gradeTitle}>Actions</div>}
                        </div>
                    </div>
                    {cards.map(card => <Card key={card._id}
                                             cardId={card._id}
                                             question={card.question}
                                             answer={card.answer}
                                             grade={card.grade}
                                             updatedAt={card.updated}
                                             isUsersPack={isUsersPack}
                                             deleteCardCallback={deleteCardCallback}/>)}

                </div>
                <div className={s.paginator}>
                    1 2 3 4 5 ... 5 Show: 10 Cards per page
                </div>
            </div>
        </div>
    )
}

type TCardProps = {
    cardId: string
    question: string
    answer: string
    updatedAt: string
    grade: number
    isUsersPack: boolean
    deleteCardCallback: (cardId: string) => void
}

const Card: React.FC<TCardProps> = (props) => {
    const {answer, cardId, question, updatedAt, grade, isUsersPack, deleteCardCallback} = props
    return (
        <div className={s.card}>
            <div className={s.qaSections}>{question}</div>
            <div className={s.qaSections}>{answer}</div>
            <div className={`${s.cardInfo} ${isUsersPack && s.cardInfoWithActions}`}>
                <div>{updatedAt.slice(0, 16)}</div>
                <Rating rating={grade}/>
                {isUsersPack && <div>
                    <SuperButton className={s.actionsBtn}>Edit</SuperButton>
                    <SuperButton className={s.actionsBtn} red onClick={() => deleteCardCallback(cardId)}>Delete</SuperButton>
                </div>}
            </div>
        </div>
    )
}