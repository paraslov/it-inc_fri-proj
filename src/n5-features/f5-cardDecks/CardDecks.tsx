import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {_setRangeValues, _updateValues, DecksStateType, getCardDecksThunk, SetValuesType} from "./cardDecks_reducer";
import s from './CardDecks.module.css'
import {TAppState} from "../../n2-bll/store";
import {Pack} from "../../n3-api/card-decks_api";
import CardDecksItem from "./CardDecksItem";
import SearchItem from "./SearchBlock/SearchItem";
import MultiRangeSlider from "../../n4-common/components/Elements/e7-MultiRangeSlider/MultiRangeSlider";
import SuperButton from "../../n4-common/components/Elements/e1-SuperButton/SuperButton";


export const CardDecks = () => {
    const [active, setActive] = useState([false, true])
    const userId = useSelector<TAppState, string>(state => state.profile._id)
    const decks = useSelector<TAppState, Pack[]>(state => state.cardDecks.cardPacks)
    const decksState = useSelector<TAppState, DecksStateType>(state => state.cardDecks)
    const dispatch = useDispatch()

    const pagesCount = Math.ceil(decksState.cardPacksTotalCount / decksState.pageCount)
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    useEffect(() => {
        dispatch(getCardDecksThunk())
    }, [])

    const updateValuesHandler = (values: SetValuesType) => {
        dispatch(_updateValues(values))
    }

    const getAllCardsHandler = (values?: SetValuesType) => {
        dispatch(getCardDecksThunk(values))
    }
    const showMyDecksHandler = () => {
        if (userId !== '') {
            dispatch(getCardDecksThunk({user_id: userId}))
        }
    }
    const getMinMaxValues = useCallback((min: number, max: number) => {
        dispatch(_setRangeValues(min, max))
    }, [])


    return (
        <div className={s.wrapper}>
            <div className={s.main__block}>
                <div className={s.main__block_menu}>
                    <h3>Show packs cards</h3>
                    <div className={s.show__packs_btn_group}>
                        <button onClick={showMyDecksHandler} className={active[0] ? s.active : ''}>My</button>
                        <button onClick={() => getAllCardsHandler()} className={active[1] ? s.active : ''}>All</button>
                    </div>
                    <h3>Number of cards</h3>
                    <MultiRangeSlider min={0} max={50} onChange={getMinMaxValues}/>
                    <SuperButton onClick={() => getAllCardsHandler()}>set values</SuperButton>
                </div>
                <div className={s.main__block_pack_list}>
                    <div className={s.packs__header}>
                        <h3>Pack list</h3>
                        <SearchItem/>
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
                                        <button className={s.voting__button} onClick={() =>
                                            updateValuesHandler({sortPacks: '1updated'})}>
                                            <div className={s.voting__triangle + ' ' + s.voting__triangle_up}/>
                                        </button>

                                        <button className={s.voting__button} onClick={() =>
                                            updateValuesHandler({sortPacks: '0updated'})}>
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
                        {pages.map((el, i) =>{
                                if (i === 11) {
                                    return <Pagination
                                        value={0}
                                        index={i}
                                        callback={(value) => getAllCardsHandler({page: value})}/>
                                }
                            if (pages.length === i + 1) {
                                return <Pagination
                                    value={el}
                                    index={i}
                                    callback={(value) => getAllCardsHandler({page: value})}/>
                            }
                            if (i > 10) {
                                return null
                            }
                                return <Pagination
                                    value={el}
                                    index={i}
                                    callback={(value) => getAllCardsHandler({page: value})}/>
                        })}
                        <div className={s.select__block}>
                            <span>show </span>
                            <select defaultValue={10} onChange={(e) =>
                                updateValuesHandler({pageCount: +e.currentTarget.value})}>
                                <option value="4">4</option>
                                <option value="7">7</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="40">40</option>
                            </select>
                            <span> Cards per page</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


type PropsType = {
    value: number
    callback: (page: number) => void
    index: number
}
const Pagination = ({value,callback,index }: PropsType) => {
    const onClickHandler = (value: number) => {
        callback(value)
    }
    return (<>
            <button disabled={value === 0} onClick={() =>
                onClickHandler(value)}
                         className={`${s.paginator__btn} 
                         ${value === index + 1 ? s.active : null}`}>{value === 0 ? '...' : value}</button>
        </>

    )
}