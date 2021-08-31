import React, {useCallback, useEffect, useState} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {
    getCards,
    gradeCardUpdateThunk,
    setGetRequestParams,
    TCardType,
    TSetRequestParams
} from '../f6-cards/cards_reducer'
import {useDispatch, useSelector} from 'react-redux'
import {selectCards, selectPackName} from '../../n2-bll/selectors/cards_selectors'
import Modal from '../../n4-common/components/c9-Modals/Modal'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import SuperRadio from '../../n4-common/components/Elements/e5-SuperRadio/SuperRadio'
import s from './Learn.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader'
import {selectIsFetching} from '../../n2-bll/selectors/app_selectors'

const getCard = (cards: TCardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1})
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1]
}

const Learn: React.FC = () => {
    const [shownAnswer, setShowAnswer] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [first, setFirst] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [grade, setGrade] = useState(0)
    const [card, setCard] = useState<TCardType>({
        __v: 0,
        comments: '',
        user_id: '',
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: ''
    })

    const packName = useSelector(selectPackName)
    const isFetching = useSelector(selectIsFetching)
    const cards = useSelector(selectCards)

    const dispatch = useDispatch()
    const packIdParam = useParams<{ packId: string }>()

    const setGetRequestParamsCallback = useCallback((requestParams: TSetRequestParams) => {
        dispatch(setGetRequestParams(requestParams))
        dispatch(getCards('100'))
    }, [dispatch])

    useEffect(() => {
        if (first) {
            setGetRequestParamsCallback({cardsPack_id: packIdParam.packId})
            setFirst(false)
        }
        if (cards.length > 0) setCard(getCard(cards))
    }, [packIdParam, setGetRequestParamsCallback, cards, first])

    const onNext = () => {
        setShowAnswer(false)
        setDisabled(true)

        if (cards.length > 0) {
            dispatch(gradeCardUpdateThunk(card._id, grade))
            setCard(getCard(cards))
        } else {

        }
    }

    if (!isOpen) return <Redirect to={PATH.CARD_DECKS}/>

    return (
        <div>
            {isFetching && <Preloader left={'45%'} top={'45%'} size={'100px'}/>}

            <Modal title={`Learn ${packName ? packName : '"no name"'}`} modalBackGround={'pinkFulfilled'}
                   isOpen={isOpen} close={() => null}>
                <div className={s.question}>
                    <span className={s.title}>Question:</span>
                    <span className={s.spanQuestion}>{card.question}</span>
                    <span className={s.spanQuestion}>{card.shots}</span>
                </div>
                {shownAnswer && <>
                    <div className={s.answer}>
                        <span className={s.title}>Answer:</span>
                        <span className={s.spanAnswer}>{card.answer}</span>
                    </div>
                    <div className={s.radio__block}>
                        <h2>Rate yourself:</h2>
                        <SuperRadio
                            options={['Did not know', 'Forgot', 'A lot of trough', 'Confused', 'Knew the answer']}
                            onChange={e => {
                                setGrade(+e.currentTarget.name)
                                setDisabled(false)
                            }}
                        />
                    </div>
                </>}
                <div>
                    <SuperButton onClick={() => setIsOpen(false)} width={'100px'}>
                        Cancel
                    </SuperButton>
                    {!shownAnswer && <SuperButton onClick={() => setShowAnswer(true)} width={'150px'}>
                        Show answer
                    </SuperButton>}
                    {shownAnswer && <SuperButton width={'150px'}
                                                 onClick={() => onNext()}
                                                 disabled={disabled}>
                        next
                    </SuperButton>}
                </div>
            </Modal>

        </div>
    )
}

export default Learn
