import React from 'react';
import s from './SearchItem.module.css';
import SuperInputText from "../../../n4-common/components/Elements/e3-SuperInputText/SuperInputText";
import SuperButton from "../../../n4-common/components/Elements/e1-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {createDeckThunk} from "../cardDecks_reducer";

function SearchItem() {
    const dispatch = useDispatch()

    const addPackHandler = () => {
        dispatch(createDeckThunk())
    }

    return (
        <div className={s.search__block}>
            <SuperInputText className={s.search__item} placeholder='search...'/>
            <SuperButton onClick={addPackHandler}>
                Add new pack
            </SuperButton>
        </div>
    );
}

export default SearchItem;