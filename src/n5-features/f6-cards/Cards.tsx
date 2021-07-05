import React from 'react'
import s from './Cards.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import {NavLink} from 'react-router-dom'
import SuperInputText from '../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'


export const Cards = () => {
    return (
        <div className={s.container}>
            <div className={s.cardsContainer}>
                <div className={s.title}>
                    <div><NavLink to={PATH.CARD_DECKS}>arrow back</NavLink></div>
                    <h2>Pack Name</h2>
                </div>
                <SuperInputText className={s.searchBar} placeholder={'Search'}>
                </SuperInputText>
                <div className={s.table}>
                    <div className={s.card}>
                        <div>Question</div>
                        <div>Answer</div>
                        <div className={s.cardInfo}>
                            <div>Last Updated</div>
                            <div>Grade</div>
                        </div>
                    </div>
                    <div className={s.card}>
                        <div>some question</div>
                        <div>some answer</div>
                        <div className={s.cardInfo}>
                            <div>05.07.2021</div>
                            <div>3 star</div>
                        </div>
                    </div>
                    <div className={s.card}>
                        <div>some question</div>
                        <div>some answer</div>
                        <div className={s.cardInfo}>
                            <div>05.07.2021</div>
                            <div>4 star</div>
                        </div>
                    </div>
                </div>
                <div>
                    1 2 3 4 5 ... 5 Show: 10 Cards per page
                </div>
            </div>
        </div>
    )
}