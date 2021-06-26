import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import style from './Login.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import SuperButton from "../../n4-common/components/Elements/e1-SuperButton/SuperButton";



export const Login = () => {
    return (
        <div className={style.form__block}>
            <h3 className={style.from__block_title}>It-incubator</h3>
            <p className={style.form__block_text}>Sign In</p>
            <div className={style.form__block_content}>
                <form className={style.form__style} action="#" method="post">
                    <label>Email</label>
                    <input type="email" name="login_email" placeholder="yourMail@mail.domain" required/>
                    <label>Password</label>
                    <input type="password" name="login_pass" placeholder="*********" required/>
                </form>
            </div>
            <NavLink to={PATH.ENTER_NEW_PASSWORD} className={`${style.form__link} ${style.forgot}`}>Forgot Password?</NavLink>
            <SuperButton className={style.btn} type="submit" name="form_login_submit">Login</SuperButton>
            <p className={style.form__text}>Don’t have an account?</p>
            <NavLink to={PATH.REGISTRATION} className={`${style.form__link } ${style.signUp}`}>Sign Up</NavLink>
        </div>

)
}