import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../n2-bll/store";
import {authThunk, logoutThunk, UserDataType} from '../f1-login/login_reducer'
import {PATH} from "../../n1-app/a2-routes/Routes";
import {Redirect} from "react-router-dom";
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {setIsFetchingRegisterAction} from "../f2-registration/registration_reducer";

export const Profile = () => {
    const dispatch = useDispatch()
    const {_id, email, name, avatar, publicCardPacksCount, isAuth} =
        useSelector<TAppState, UserDataType>(state => state.login)

    useEffect(() => {
        // if userData not found, send request to auth/me
        if(!isAuth) {
            dispatch(authThunk())
            dispatch(setIsFetchingRegisterAction(false))
        }
    },[])

    const logout = () => dispatch(logoutThunk())

    //if userData not found redirect to login page
    if(!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
            <div style={{marginBottom: '20px'}}>
                <span>My name is: {name}</span> <br/>
                <span>My id is: {_id}</span> <br/>
                <span>My email is: {email}</span> <br/>
                <span>My avatar is: {avatar}</span> <br/>
                <span>My public card count is: {publicCardPacksCount}</span> <br/>
            </div>
            <SuperButton onClick={logout}>Log out</SuperButton>
        </div>
    )
}