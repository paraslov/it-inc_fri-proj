import React, {useState} from 'react'
import s from './SearchBar.module.css'
import SuperInputText from '../Elements/e3-SuperInputText/SuperInputText'

type TSearchBarProps = {
    searchCallback: (searchText: string) => void
    disabled?: boolean
}

export const SearchBar: React.FC<TSearchBarProps> = ({searchCallback, disabled= false}) => {

    const [searchText, setSearchText] = useState('')
    const onEnterCB = () => {
        if(!disabled) {
            searchCallback(searchText)
        }
    }

    return (
        <div className={s.searchBar}>
            <SuperInputText className={s.searchBarInput}
                            placeholder={'Search...'}
                            onChangeText={setSearchText}
                onEnter={onEnterCB}/>
            <button className={s.searchBarBtn} onClick={() => searchCallback(searchText)} disabled={disabled}/>
        </div>
    )
}