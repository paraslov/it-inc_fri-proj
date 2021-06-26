import React from 'react'
import s from '../restore_pw/RestorePassword.module.css'
import SuperInputText from '../../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import SuperButton from '../../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {useFormik} from 'formik'


export const SetNewPassword = () => {

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <div className={s.container}>
            <div className={s.restoreContainer}>
                <div className={s.header}>
                    <h2>It-incubator</h2>
                    <h3>Create new password</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <SuperInputText placeholder={'Password'}
                                    type={'password'}
                                    style={{width: '80%', opacity: '0.7'}}
                                    name={'password'}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}/>
                    <span className={s.instructions} style={{marginBottom: '150px'}}>
                        Create new password and we will send you further instructions to email
                    </span>
                    <SuperButton style={{width: '65%'}} type={'submit'}>Create new password</SuperButton>
                </form>
            </div>
        </div>
    )
}