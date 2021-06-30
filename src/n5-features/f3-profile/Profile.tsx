import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../n2-bll/store";
import {authThunk, logoutThunk} from '../f1-login/login_reducer'
import {PATH} from "../../n1-app/a2-routes/Routes";
import {Redirect} from "react-router-dom";
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {changeUserData, UserDataType} from "./progile_reducer";
import SuperEditableSpan from "../../n4-common/components/Elements/e6-SuperEditableSpan/SuperEditableSpan";

export const Profile = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<TAppState, boolean>(state => state.login.isAuth)
    const {_id, email, name, avatar, publicCardPacksCount} =
        useSelector<TAppState, UserDataType>(state => state.profile)
    const [myName, setMyName] = useState('')
    const [myAvatar, setMyAvatar] = useState('Avatar is not defined')

    useEffect(() => {
        // if userData not found, send request to auth/me
        if(!isAuth) {
            dispatch(authThunk())
        }
    },[])

    useEffect(() => {
        setMyName(name)
        if(avatar) {
            setMyAvatar(avatar)
        }
    },[name,avatar])

    const logout = () => dispatch(logoutThunk())

    const changeNameHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setMyName(e.currentTarget.value)
    }
    const changeAvatarHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setMyAvatar(e.currentTarget.value)
    }
    const changeDataHandler = () => {
        dispatch(changeUserData({name: myName, avatar: myAvatar}))
    }
    //if userData not found redirect to login page
    if(!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
            <div style={{marginBottom: '20px'}}>
                <div>My name is:
                    <SuperEditableSpan  onEnter={changeDataHandler} onChange={changeNameHandler} value={myName}/>
                </div>

                {/*<span>My name is: {name}</span> <br/>*/}
                <span>My id is: {_id}</span> <br/>
                <span>My email is: {email}</span> <br/>
                <div>My avatar is:
                    <SuperEditableSpan  onEnter={changeDataHandler} onChange={changeAvatarHandler} value={myAvatar}/>
                </div>
                {/*<span>My avatar is: {avatar}</span> <br/>*/}
                <span>My public card count is: {publicCardPacksCount}</span> <br/>
            </div>
            <SuperButton onClick={logout}>Log out</SuperButton>
        </div>
    )
}