import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TAppState} from '../../n2-bll/store'
import {authThunk, logoutThunk} from '../f1-login/login_reducer'
import {PATH} from '../../n1-app/a2-routes/Routes'
import {Redirect} from 'react-router-dom'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {changeUserData, UserDataType} from './progile_reducer'
import SuperEditableSpan from '../../n4-common/components/Elements/e6-SuperEditableSpan/SuperEditableSpan'
import s from './Profile.module.css'
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader'

export const Profile = () => {
    const dispatch = useDispatch()
//* ==================================================================================== Data ==================>>
    const isAuth = useSelector<TAppState, boolean>(state => state.login.isAuth)
    const isFetching = useSelector<TAppState, boolean>(state => state.app.isFetching)

    const {_id, email, name, avatar, publicCardPacksCount} =
        useSelector<TAppState, UserDataType>(state => state.profile)
//* ==================================================================================== Local state ===========>>
    const [myName, setMyName] = useState('')
    const [myAvatar, setMyAvatar] = useState('Avatar is not defined')
    const [updateProfileBtnIsActive, setUpdateProfileBtnIsActive] = useState(false)
//* ==================================================================================== Authorization =========>>
    useEffect(() => {
        // if userData not found, send request to auth/me
        if (!isAuth) {
            dispatch(authThunk())
        }
    }, [])

// setting start values for local state
    useEffect(() => {
        setMyName(name)
        if (avatar) {
            setMyAvatar(avatar)
        }
    }, [name, avatar])
//* ==================================================================================== Callbacks =============>>
    const logout = () => dispatch(logoutThunk())
    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!updateProfileBtnIsActive) setUpdateProfileBtnIsActive(true)
        setMyName(e.currentTarget.value)
    }
    const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!updateProfileBtnIsActive) setUpdateProfileBtnIsActive(true)
        setMyAvatar(e.currentTarget.value)
    }
    const changeDataHandler = () => {
        setUpdateProfileBtnIsActive(false)
        dispatch(changeUserData({name: myName, avatar: myAvatar}))
    }
    //if userData not found redirect to login page
    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
            {isFetching && <Preloader left={'40%'} top={'40%'} size={'100px'}/>}
            <div style={{marginBottom: '20px', height: '300px'}}>
                <img src={avatar} alt="" className={s.avatar}/>
                <div>My name is:
                    <SuperEditableSpan onChange={changeNameHandler} value={myName}/>
                </div>
                <span>My id is: {_id}</span> <br/>
                <span>My email is: {email}</span> <br/>
                <div>My avatar is:
                    <SuperEditableSpan onChange={changeAvatarHandler} value={myAvatar}/>
                </div>
                <span>My public card count is: {publicCardPacksCount}</span> <br/>
            </div>
            <SuperButton onClick={logout} style={{marginRight: '20px'}}>Log out</SuperButton>
            <SuperButton onClick={changeDataHandler} disabled={!updateProfileBtnIsActive}>Update Profile</SuperButton>
        </div>
    )
}