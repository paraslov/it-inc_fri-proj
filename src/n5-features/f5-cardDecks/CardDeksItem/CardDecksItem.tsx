import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {removeDeckThunk, updateValueThunk} from "../cardDecks_reducer";
import {TAppState} from "../../../n2-bll/store";
import { NavLink } from 'react-router-dom';
import {setPackName} from '../../f6-cards/cards_reducer'
import SuperButton from "../../../n4-common/components/Elements/e1-SuperButton/SuperButton";
import s from './CardDecksItem.module.css'

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
    const isFetching = useSelector<TAppState, boolean>(state => state.app.isFetching)
    const dispatch = useDispatch()

    const removeDeckHandler = () => {
        dispatch(removeDeckThunk(id))
    }

    const updateNameHandler = () => {
        dispatch(updateValueThunk(id))
    }

    const onNavLinkClick = () => dispatch(setPackName({packName: name}))

    return (
        <div className={s.table__body}>
                <div className={s.table__item}>
                    <NavLink to={`/cards/${id}`} className={s.table__link} onClick={onNavLinkClick}>{name}</NavLink>
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
                {user_id === userId ?
                    <SuperButton
                        className={s.actionBtn}
                        disabled={isFetching}
                        red
                        onClick={removeDeckHandler}>Delete</SuperButton> : null}
                <SuperButton
                    className={s.actionBtn}
                    disabled={isFetching}
                    onClick={updateNameHandler}>Edit</SuperButton>
                <SuperButton
                    className={s.actionBtn}
                    disabled={isFetching} >Learn</SuperButton>
            </div>
        </div>

    )
}

export default CardDecksItem