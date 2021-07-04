import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getCardDecksThunk} from "./cardDecks_reducer";
import s from './CardDecks.module.css'
import {TAppState} from "../../n2-bll/store";
import {Pack} from "../../n3-api/card-decks_api";
import CardDecksItem from "./CardDecksItem";
import SearchItem from "./SearchBlock/SearchItem";
import MultiRangeSlider from "../../n4-common/components/Elements/e7-MultiRangeSlider/MultiRangeSlider";


export const CardDecks = () => {
    const userId = useSelector<TAppState, string>(state => state.profile._id)
    const decks = useSelector<TAppState, Pack[] >(state => state.cardDecks.cardPacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardDecksThunk())
    },[])


    const showAllDecksHandler = () => {
        dispatch(getCardDecksThunk())
    }
    const showMyDecksHandler = () => {
        if (userId !== '') {
            dispatch(getCardDecksThunk({user_id: userId}))
        }
    }


    return (
        <div className={s.wrapper}>
            <div className={s.main__block}>
                <div className={s.main__block_menu}>
                    <h3>Show packs cards</h3>
                    <div className={s.show__packs_btn_group}>
                        <button onClick={showMyDecksHandler}>My</button>
                        <button onClick={showAllDecksHandler}>All</button>
                    </div>
                   <h3>Number of cards</h3>
                      <MultiRangeSlider min={10} max={50} onChange={() => console.log()}/>
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
                                <div className={s.table__item_wrapper}>
                                    Last Updated
                                    <div className={s.voting}>
                                        <button className={s.voting__button}>
                                            <div className={s.voting__triangle + ' ' + s.voting__triangle_up}/>
                                        </button>

                                        <button className={s.voting__button}>
                                            <div className={s.voting__triangle + ' ' + s.voting__triangle_down}/>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className={s.table__item}>
                                Created by
                            </div>
                            <div className={s.table__item}>
                                Actions
                            </div>
                        </div>

                        {decks.map((item, i) =>
                            <CardDecksItem key={i} name={item.name}
                                           cardsCount={item.cardsCount}
                                           updated={item.updated}
                                           user_name={item.user_name}
                                           id={item._id}
                                           userId={item.user_id}
                            />)}
                    </div>
                    <div className={s.pagination__block}>

                    </div>
                </div>
            </div>
        </div>

    )
}