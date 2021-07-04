import React from 'react'
import s from './CardDecks.module.css'
import {useDispatch, useSelector} from "react-redux";
import {removeDeckThunk, updateValueThunk} from "./cardDecks_reducer";
import {TAppState} from "../../n2-bll/store";

type PropsType = {
    name: string
    cardsCount: number
    updated: string
    user_name: string
    id: string
    userId: string
}
const CardDecksItem = ({name,cardsCount,updated,user_name, id, userId}: PropsType) => {
    const user_id = useSelector<TAppState, string>(state => state.profile._id)
    const dispatch = useDispatch()

    const removeDeckHandler = () => {
        dispatch(removeDeckThunk(id))
    }

    const updateNameHandler = () => {
        dispatch(updateValueThunk(id))
    }
    return (
        <div className={s.table__body}>
            <div className={s.table__item}>
                {name}
            </div>
            <div className={s.table__item}>
                {cardsCount}
            </div>
            <div className={s.table__item}>
                {updated.slice(0,10) + ', ' + updated.slice(11,19)}
            </div>
            <div className={s.table__item}>
                {user_name}
            </div>
            <div className={s.table__item +' '+ s.btn__group}>
                {user_id === userId ? <button onClick={removeDeckHandler}>Delete</button> : null}
                <button onClick={updateNameHandler}>Edit</button>
                <button>Learn</button>
            </div>
        </div>

    )
}

export default CardDecksItem