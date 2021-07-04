import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {cardDecksReducerThunk} from "./cardDecks_reducer";
import s from './CardDecks.module.css'
import {TAppState} from "../../n2-bll/store";
import {Pack} from "../../n3-api/card-decks_api";
import CardDecksItem from "./CardDecksItem";
import SearchItem from "./SearchBlock/SearchItem";


export const CardDecks = () => {
    const decks = useSelector<TAppState, Pack[] >(state => state.cardDecks.cardPacks)
    console.log(decks)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(cardDecksReducerThunk())
    },[])


    return (
        <div className={s.wrapper}>
            <div className={s.main__block}>
                <div className={s.main__block_menu}>
                    <h3>Show packs cards</h3>
                </div>
                <div className={s.main__block_pack_list}>
                    <div className={s.packs__header}>
                        <h3>Pack list</h3>
                        <SearchItem />
                    </div>
                    <div className={s.table}>
                        <div className={s.table__header}>
                            <div className={s.table__item}>
                                Name
                            </div>
                            <div className={s.table__item}>
                                Cards
                            </div>
                            <div className={s.table__item}>
                                Last Updated
                            </div>
                            <div className={s.table__item}>
                                Created by
                            </div>
                            <div className={s.table__item}>
                                Actions
                            </div>
                        </div>

                        {decks.map((item) =>
                            <CardDecksItem name={item.name}
                                           cardsCount={item.cardsCount}
                                           updated={item.updated}
                                           user_name={item.user_name}/>)}
                    </div>
                    <div className={s.pagination__block}>

                    </div>
                </div>
            </div>
        </div>

    )
}