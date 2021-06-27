import React from 'react'
import s from '../restore_pw/RestorePassword.module.css'
import SuperInputText from '../../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import SuperButton from '../../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {useFormik} from 'formik'
import {Redirect, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setNewPassword} from '../password_reducer'
import {selectIsSetNewPasswordSuccess} from '../../../n2-bll/selectors/password_selectors'
import {PATH} from '../../../n1-app/a2-routes/Routes'
import {Preloader} from '../../../n4-common/components/c2-Preloader/Preloader'
import {selectIsFetching} from '../../../n2-bll/selectors/app_selectors'


export const SetNewPassword = () => {

    const dispatch = useDispatch()
    const isFetching = useSelector(selectIsFetching)
    const isSetNewPasswordSuccess = useSelector(selectIsSetNewPasswordSuccess)
    const token = useParams<{ token: string }>()

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: values => {
            console.log(values)
            console.log(token)
            dispatch(setNewPassword(values.password, token.token))
        }
    })

    // if password change successful then redirect to login page
    if (isSetNewPasswordSuccess) return <Redirect to={PATH.LOGIN}/>

    return (
        <div className={s.container}>
            <div className={s.restoreContainer}>
                {isFetching && <Preloader left={'40%'} top={'40%'} size={'100px'}/>}
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
                    <SuperButton style={{width: '65%'}} type={'submit'} disabled={isFetching}>
                        Create new password
                    </SuperButton>
                </form>
            </div>
        </div>
    )
}