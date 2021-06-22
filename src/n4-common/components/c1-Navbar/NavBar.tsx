import React from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../n1-app/a2-routes/Routes'
import s from './NavBar.module.css'

export const NavBar = () => {
    return (
        <div className={s.navbarContainer}>
            <NavLink to={PATH.PROFILE}>Profile</NavLink>
            <NavLink to={PATH.LOGIN}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
            <NavLink to={PATH.RESTORE_PASSWORD}>Restore password</NavLink>
            <NavLink to={PATH.ENTER_NEW_PASSWORD}>New password</NavLink>
            <NavLink to={PATH.TESTS}>Tests</NavLink>
        </div>
    )
}