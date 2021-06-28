import React from 'react'
import s from '../restore_pw/RestorePassword.module.css'
import {EmailImg} from '../../../assets/img/password/email_svg'
import {useSelector} from 'react-redux'
import {selectRestorationEmail} from '../../../n2-bll/selectors/password_selectors'


export const CheckEmail = () => {

    const restorationEmail = useSelector(selectRestorationEmail)

    return (
        <div className={s.container}>
            <div className={s.restoreContainer}>
                <div className={s.header}>
                    <h2>It-incubator</h2>
                    <EmailImg/>
                    <h3>Check Email</h3>
                </div>
                <span className={s.instructions}>
                        We’ve sent an Email with instructions to <b>{restorationEmail}</b>
                    </span>
            </div>
        </div>
    )
}