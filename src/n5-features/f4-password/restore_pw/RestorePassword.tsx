import React from 'react'
import SuperInputText from '../../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import SuperButton from '../../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../n1-app/a2-routes/Routes'
import s from './RestorePassword.module.css'


export const RestorePassword = () => {
    return (
        <div className={s.container}>
            <div className={s.restoreContainer}>
                <div className={s.header}>
                    <h2>It-incubator</h2>
                    <h3>Forgot your password?</h3>
                </div>
                <form>
                    <SuperInputText placeholder={'Email'} style={{width: '80%', opacity: '0.7'}}/>
                    <span className={s.instructions} style={{marginBottom: '100px'}}>
                        Enter your email address and we will sent you further instructions
                    </span>
                    <SuperButton style={{width: '65%'}}>Send instructions</SuperButton>
                </form>
                <div>
                    <p className={s.instructions} style={{marginTop: '35px'}}>
                        Did you remember your password?
                    </p>
                    <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
                </div>
            </div>
        </div>
    )
}