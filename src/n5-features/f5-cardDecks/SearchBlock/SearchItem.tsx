import React from 'react';
import s from './SearchItem.module.css';
import SuperInputText from "../../../n4-common/components/Elements/e3-SuperInputText/SuperInputText";
import SuperButton from "../../../n4-common/components/Elements/e1-SuperButton/SuperButton";

function SearchItem() {
    return (
        <div className={s.search__block}>
            <SuperInputText className={s.search__item} placeholder='search...'/>
            <SuperButton>
                Add new pack
            </SuperButton>
        </div>
    );
}

export default SearchItem;