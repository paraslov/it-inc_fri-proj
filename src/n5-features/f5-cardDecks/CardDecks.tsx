import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    _updateValues,
    createDeckThunk,
    DecksStateType,
    getCardDecksThunk,
    setMinMaxCardsSearchParams,
    SetValuesType
} from './cardDecks_reducer'
import s from './CardDecks.module.css'
import {TAppState} from '../../n2-bll/store'
import {Pack} from '../../n3-api/card-decks_api'
import CardDecksItem from './CardDeksItem/CardDecksItem'
import MultiRangeSlider from '../../n4-common/components/Elements/e7-MultiRangeSlider/MultiRangeSlider'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {Paginator} from '../../n4-common/components/с6-Paginator/Paginator'
import {SelectPage} from '../../n4-common/components/c7-SelectPage/SelectPage'
import {SortArrow} from '../../n4-common/components/c8-SortArrow/SortArrow'
import {SearchBar} from '../../n4-common/components/c5-SearchBar/SearchBar'
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader'
import Modal from "../../n4-common/components/c6-Modals/Modal";
import SuperInputText from "../../n4-common/components/Elements/e3-SuperInputText/SuperInputText";

export const CardDecks = () => {
    const [shownModal, setShownModal] = useState(false)
    const [nameOfPack, setNameOfPack] = useState('')


    const userId = useSelector<TAppState, string>(state => state.profile._id)
    const user_id = useSelector<TAppState, string>(state => state.cardDecks.user_id)
    const decks = useSelector<TAppState, Pack[]>(state => state.cardDecks.cardPacks)
    const decksState = useSelector<TAppState, DecksStateType>(state => state.cardDecks)
    const isFetching = useSelector<TAppState, boolean>(state => state.app.isFetching)
    const dispatch = useDispatch()

    const minParam = useSelector<TAppState, number>(state => state.cardDecks.minParam)
    const maxParam = useSelector<TAppState, number>(state => state.cardDecks.maxParam)

    useEffect(() => {
        dispatch(getCardDecksThunk())
    }, [dispatch])

    const getAllCardsHandler = () => {
        setParams({minCardsCount: minParam, maxCardsCount: maxParam, user_id: ''})
    }

    const addPackHandler = () => {
        if(nameOfPack.length) {
            dispatch(createDeckThunk(nameOfPack))
            setShownModal(false)
            setNameOfPack('')
        }
    }

    const setParams = (requestParams: SetValuesType) => {
        dispatch(_updateValues(requestParams))
        dispatch(getCardDecksThunk())
    }

    const pageNumberRequest = (page: number) => setParams({page})
    const onChangePageCount = (pageCount: number) => setParams({pageCount})
    const sortCards = (param: string) => setParams({sortPacks: param})
    const searchPack = (searchText: string) => setParams({packName: searchText})

    const showMyDecksHandler = () => {
        if (userId !== '') {
            setParams({minCardsCount: minParam, maxCardsCount: maxParam, user_id: userId})
        }
    }

    let timeoutId: NodeJS.Timeout
    const getMinMaxValues = useCallback((min: number, max: number) => {
        clearTimeout(timeoutId)
        if (minParam !== min || maxParam !== max) {
            timeoutId = setTimeout(() => {
                dispatch(setMinMaxCardsSearchParams({minParam: min, maxParam: max}))
                setParams({minCardsCount: min, maxCardsCount: max})
            }, 1000)
        }
    }, [])


    return (
        <div className={s.wrapper}>
            {isFetching && <Preloader left={'40%'} top={'40%'} size={'100px'}/>}
            <AddNewPackModal
                open={shownModal}
                close={() => setShownModal(false)}
                value={nameOfPack}
                onChange={(e) => setNameOfPack(e.currentTarget.value)}
                onClick={addPackHandler}
            />
            <div className={s.main__block}>
                <div className={s.main__block_menu}>
                    <h3>Show packs cards</h3>
                    <div className={s.show__packs_btn_group}>
                        <button disabled={isFetching} onClick={showMyDecksHandler}
                                className={user_id ? s.active : ''}>My
                        </button>
                        <button disabled={isFetching} onClick={getAllCardsHandler}
                                className={user_id ? '' : s.active}>All
                        </button>
                    </div>
                    <h3>Number of cards</h3>
                    <MultiRangeSlider
                        min={0}
                        max={103}
                        currentMin={minParam}
                        currentMax={maxParam}
                        disabled={isFetching}
                        onChange={getMinMaxValues}/>
                </div>
                <div className={s.main__block_pack_list}>
                    <div className={s.packs__header}>
                        <h3>Pack list</h3>
                        <div className={s.packs__header_wrapper}>
                            <SearchBar searchCallback={searchPack} disabled={isFetching}
                                       searchTextRequest={decksState.packName}/>
                            <SuperButton disabled={isFetching} onClick={() => setShownModal(true)}>
                                Add new pack
                            </SuperButton>
                        </div>
                    </div>
                    <div className={s.table}>
                        <div className={s.table__header}>
                            <div className={s.table__item}>
                                Name
                                <SortArrow sortValue={'name'} onClick={sortCards} isFetching={isFetching}/>
                            </div>
                            <div className={s.table__item}>
                                Cards
                                <SortArrow sortValue={'cardsCount'} onClick={sortCards} isFetching={isFetching}/>
                            </div>
                            <div className={s.table__item}>
                                <div className={s.table__item_wrapper}>
                                    Last Updated
                                    <SortArrow sortValue={'updated'} onClick={sortCards} isFetching={isFetching}/>
                                </div>

                            </div>
                            <div className={s.table__item}>
                                Created by
                                <SortArrow sortValue={'user_name'} onClick={sortCards} isFetching={isFetching}/>
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
                        <Paginator totalItemsCount={decksState.cardPacksTotalCount}
                                   pageSize={decksState.pageCount}
                                   currentPage={decksState.page}
                                   disabled={isFetching}
                                   onPageNumberClick={pageNumberRequest}
                        />
                        <div className={s.select__block}>
                            <SelectPage onChangeOptions={onChangePageCount}
                                        defaultValue={decksState.pageCount}
                                        disabled={isFetching}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


type ModalType = {
    open: boolean,
    close: () => void,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void
}

const AddNewPackModal: React.FC<ModalType> =(
    {open, close, value, onChange, onClick}
) => {
        return <Modal closeBtn={true} title={"Add new pack"} isOpen={open} close={close}>
            <SuperInputText label={"Name of pack"}
                            value={value}
                            onChange={onChange}/>
            <div>
                <SuperButton width={"100px"}
                             onClick={close}>
                    Cancel
                </SuperButton>
                <SuperButton width={"100px"} onClick={onClick}>
                    Save
                </SuperButton>
            </div>
        </Modal>;
}


