import React from 'react'
import s from './CardDecks.module.css'

type PropsType = {
    name: string
    cardsCount: number
    updated: string
    user_name: string
}
const CardDecksItem = ({name,cardsCount,updated,user_name}: PropsType) => {
    return (
        <div className={s.table__body}>
            <div className={s.table__item}>
                {name}
            </div>
            <div className={s.table__item}>
                {cardsCount}
            </div>
            <div className={s.table__item}>
                {updated.slice(0,10)}
            </div>
            <div className={s.table__item}>
                {user_name}
            </div>
            <div className={s.table__item +' '+ s.btn__group}>
                <button>Delete</button>
                <button>Edit</button>
                <button>Learn</button>
            </div>
        </div>

    )
}

export default CardDecksItem