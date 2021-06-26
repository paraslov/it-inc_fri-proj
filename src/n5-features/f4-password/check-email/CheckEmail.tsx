import React from 'react'
import s from '../restore_pw/RestorePassword.module.css'
import {EmailImg} from '../../../assets/password/email_svg'


export const CheckEmail = () => {
    return (
        <div className={s.container}>
            <div className={s.restoreContainer}>
                <div className={s.header}>
                    <h2>It-incubator</h2>
                    <EmailImg/>
                    <h3>Check Email</h3>
                </div>
                <span className={s.instructions}>
                        We’ve sent an Email with instructions to example@mail.com
                    </span>
            </div>
        </div>
    )
}