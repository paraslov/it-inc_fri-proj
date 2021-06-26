import React from 'react'
import SuperInputText from '../../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import SuperButton from '../../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../n1-app/a2-routes/Routes'
import s from './RestorePassword.module.css'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {restorePassword} from '../password_reducer'
import {selectRestoreSuccess} from '../../../n2-bll/selectors/password_selectors'
import {CheckEmail} from '../check-email/CheckEmail'


export const RestorePassword = () => {

    const dispatch = useDispatch()
    const restoreSuccess = useSelector(selectRestoreSuccess)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            console.log(values)
            dispatch(restorePassword(values.email))
        }
    })

    if(restoreSuccess) return <CheckEmail/>

    return (
        <div className={s.container}>
            <div className={s.restoreContainer}>
                <div className={s.header}>
                    <h2>It-incubator</h2>
                    <h3>Forgot your password?</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <SuperInputText placeholder={'Email'}
                                    style={{width: '80%', opacity: '0.7'}}
                                    name={'email'}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}/>
                    <span className={s.instructions}>
                        Enter your email address and we will sent you further instructions
                    </span>
                    <SuperButton style={{width: '65%', marginTop: '100px'}} type={'submit'}>Send instructions</SuperButton>
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