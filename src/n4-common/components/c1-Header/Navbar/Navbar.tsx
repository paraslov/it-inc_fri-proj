import s from '../Header.module.css'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../../n1-app/a2-routes/Routes'
import {Human_img} from '../../../../assets/img/profile/human_img'
import {Cards_img} from '../../../../assets/img/profile/cards_img'
import React from 'react'

export const Navbar = () => {
    return (
        <div className={s.navbarContainer}>
            <NavLink to={PATH.PROFILE} className={s.navLink} activeClassName={s.active}>
                <div className={s.navLinkContext}>
                    <Human_img/>
                    <span>Profile</span>
                </div>
            </NavLink>
            <NavLink to={PATH.CARD_DECKS} className={s.navLink} activeClassName={s.active}>
                <div className={s.navLinkContext}>
                    <Cards_img/>
                    <span>Packs list</span>
                </div>
            </NavLink>
            {/*<NavLink to={PATH.LOGIN} activeClassName={s.active}>Login</NavLink>*/}
            {/*<NavLink to={PATH.REGISTRATION} activeClassName={s.active}>Registration</NavLink>*/}
            {/*<NavLink to={PATH.RESTORE_PASSWORD} activeClassName={s.active}>Restore password</NavLink>*/}
            {/*<NavLink to={PATH.SET_NEW_PASSWORD} activeClassName={s.active}>New password</NavLink>*/}
            {/*<NavLink to={PATH.CARDS} activeClassName={s.active}>Cards</NavLink>*/}
            {/*<NavLink to={PATH.TESTS} activeClassName={s.active}>Tests</NavLink>*/}
        </div>
    )
}