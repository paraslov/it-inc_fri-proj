import React, {useEffect} from 'react'
import s from './Cards.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import {NavLink, Redirect, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createCard, deleteCard, getCards, setGetRequestParams, TSetRequestParams, updateCard} from './cards_reducer'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {TCardData, TCardUpdateData} from '../../n3-api/cards_api'
import {
    selectCards,
    selectCardsPack_id,
    selectCardsTotalCount,
    selectCurrentPage, selectPackName,
    selectPackUserId,
    selectPageCount
} from '../../n2-bll/selectors/cards_selectors'
import {selectUser_id} from '../../n2-bll/selectors/profile_selectors'
import {selectIsFetching} from '../../n2-bll/selectors/app_selectors'
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader'
import {SearchBar} from '../../n4-common/components/c5-SearchBar/SearchBar'
import {Paginator} from '../../n4-common/components/с6-Paginator/Paginator'
import {SelectPage} from '../../n4-common/components/c7-SelectPage/SelectPage'
import {ItemsTable} from './ItemsTable/ItemsTable'


export const Cards = () => {
    //* ==================================  Data  =================================================================>>
    const dispatch = useDispatch()
    const isFetching = useSelector(selectIsFetching)
    // id's
    const cardsPack_id = useSelector(selectCardsPack_id)
    const user_id = useSelector(selectUser_id)
    const packUserId = useSelector(selectPackUserId)
    // cards data
    const packName = useSelector(selectPackName)
    const cards = useSelector(selectCards)
    const cardsTotalCount = useSelector(selectCardsTotalCount)
    // page data
    const currentPage = useSelector(selectCurrentPage)
    const pageCount = useSelector(selectPageCount)

    const packIdParam = useParams<{ packId: string }>()

    // check if it's current user's deck of cards or not and renders Actions, edit and delete according to result
    const isUsersPack = packUserId === user_id
    // hardcode data for create card testing
    const newCard: TCardData = {
        cardsPack_id,
        question: 'card to delete/update',
        answer: 'no card, no answer.. =0_0=',
        grade: 4
    }
    // if no packUserId is settled in redux, send request
    useEffect(() => {
        if(packIdParam.packId !== ':packId') setGetRequestParamsCallback({cardsPack_id: packIdParam.packId})
    }, [packIdParam])


    //* ==================================  Callbacks  ============================================================>>
    const createCardCallback = () => dispatch(createCard(newCard))
    const deleteCardCallback = (cardId: string) => dispatch(deleteCard(cardId))
    const updateCardCallback = (cardData: TCardUpdateData) => dispatch(updateCard(cardData))
    // helper for all kind of searching and sorting operations
    const setGetRequestParamsCallback = (requestParams: TSetRequestParams) => {
        dispatch(setGetRequestParams(requestParams))
        dispatch(getCards())
    }
    const searchCard = (searchText: string) => setGetRequestParamsCallback({cardQuestion: searchText})
    const sortCards = (param: string) => setGetRequestParamsCallback({sortCards: param})
    // paginator callbacks
    const onPageNumberChange = (page: number) => setGetRequestParamsCallback({page})
    const onPageCountChange = (pageCount: number) => setGetRequestParamsCallback({pageCount})

    if(packIdParam.packId === ':packId') return <Redirect to={PATH.CARD_DECKS}/>

    return (
        <div className={s.container}>
            {isFetching && <Preloader left={'40%'} top={'40%'} size={'100px'}/>}
            <div className={s.cardsContainer}>
                <div className={s.title}>
                    <NavLink to={PATH.CARD_DECKS} className={s.arrow}>&larr;</NavLink>
                    <h2>{packName}</h2>
                </div>
                <div className={s.search}>
                    <SearchBar searchCallback={searchCard} disabled={isFetching}/>
                    <SuperButton onClick={createCardCallback} disabled={isFetching}>Add new card</SuperButton>
                </div>
                <ItemsTable items={cards}
                            isUsersPack={isUsersPack}
                            isFetching={isFetching}
                            sortCallback={sortCards}
                            deleteCallback={deleteCardCallback}
                            updateCallback={updateCardCallback}/>
                <div className={s.paginator}>
                    <Paginator totalItemsCount={cardsTotalCount}
                               pageSize={pageCount}
                               currentPage={currentPage}
                               disabled={isFetching}
                               onPageNumberClick={onPageNumberChange}
                    />
                    <SelectPage onChangeOptions={onPageCountChange}
                                defaultValue={pageCount}
                                disabled={isFetching}
                                description={'Cards per Page'}/>
                </div>
            </div>
        </div>
    )
}



