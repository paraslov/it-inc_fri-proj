import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {cardDecksReducerThunk} from "./cardDecks_reducer";


export const CardDecks = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(cardDecksReducerThunk())
    },[])
    return (
        <div>
            CardDecks page.
        </div>
    )
}