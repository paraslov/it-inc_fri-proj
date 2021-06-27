import React from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../n1-app/a2-routes/Routes'
import s from './NavBar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../../n2-bll/store";
import {logoutThunk} from "../../../n5-features/f1-login/login_reducer";

export const NavBar = () => {
    const isAuth = useSelector<TAppState>(state => state.login.isAuth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutThunk())
    }

    return (
        <div className={s.navbarContainer}>
            <NavLink to={PATH.PROFILE}>Profile</NavLink>
            {isAuth ?<NavLink to={PATH.LOGIN} onClick={handleLogout}>logout</NavLink> :
                <NavLink to={PATH.LOGIN}>Login</NavLink>}
            <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
            <NavLink to={PATH.RESTORE_PASSWORD}>Restore password</NavLink>
            <NavLink to={PATH.ENTER_NEW_PASSWORD}>New password</NavLink>
            <NavLink to={PATH.TESTS}>Tests</NavLink>
        </div>
    )
}