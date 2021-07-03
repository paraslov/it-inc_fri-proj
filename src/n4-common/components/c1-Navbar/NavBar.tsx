import React from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../n1-app/a2-routes/Routes'
import s from './NavBar.module.css'

export const NavBar = () => {
    return (
        <div className={s.navbarContainer}>
            <NavLink to={PATH.PROFILE} activeClassName={s.active}>Profile</NavLink>
            <NavLink to={PATH.LOGIN} activeClassName={s.active}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION} activeClassName={s.active}>Registration</NavLink>
            <NavLink to={PATH.RESTORE_PASSWORD} activeClassName={s.active}>Restore password</NavLink>
            <NavLink to={PATH.SET_NEW_PASSWORD} activeClassName={s.active}>New password</NavLink>
            <NavLink to={PATH.CARD_DECKS} activeClassName={s.active}>Card decks</NavLink>
            <NavLink to={PATH.CARDS} activeClassName={s.active}>Cards</NavLink>
            <NavLink to={PATH.TESTS} activeClassName={s.active}>Tests</NavLink>
        </div>
    )
}