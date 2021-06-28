import React from 'react'
import registration from './Registration.module.css'
import {TAppState} from '../../n2-bll/store'
import {loginMeThunk, registrationThunk} from './registration_reducer'
import {useDispatch, useSelector} from 'react-redux'
import {Field, Form, Formik} from 'formik'
import SuperInputTextEmail from './components/SuperInputTextEmail'
import SuperInputTextPassword from './components/SuperInputTextPassword'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-app/a2-routes/Routes";


const Registration = React.memo(() => {

    const error = useSelector<TAppState>(state => state.registration.error)
    const isFetching = useSelector<TAppState>(state => state.registration.isFetching)

    const dispatch = useDispatch()

    if (isFetching) {
        debugger
        return <Redirect to={PATH.PROFILE}/>

    }


    return (
        <div className={registration.container}>
            <div className={registration.block}>
                <div className={registration.text}>
                    <h2 className={registration.title}>It-incubator</h2>
                    <h3>Sign Up</h3>
                </div>
                <div className={registration.form}>
                    <Formik
                        initialValues={
                            {
                                email: '',
                                password1: '',
                                password2: '',
                                error: ''
                            }
                        }
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email !== '' && values.password1 !== '' && values.password2 !== '') {
                                if (values.password1 === values.password2) {
                                    dispatch(registrationThunk(values.email, values.password1))
                                    dispatch(loginMeThunk(values.email, values.password1))
                                    setSubmitting(false)
                                }
                            }
                            setSubmitting(false)
                        }}>
                        {({isSubmitting}) => (
                            <Form>

                                <div className={registration.inputs}>
                                    <div>
                                        <Field name="email"
                                               error={error}
                                               component={SuperInputTextEmail}
                                        />
                                    </div>

                                    <Field name="password1"
                                           component={SuperInputTextPassword}
                                           error={error}
                                    />
                                    <Field name="password2"
                                           component={SuperInputTextPassword}
                                           error={error}
                                    />
                                </div>
                                <div className={registration.buttons}>
                                    <SuperButton type={'reset'} registrationCancel={true} disabled={isSubmitting}>
                                        <span className={registration.cancel}>Cancel</span>
                                    </SuperButton>
                                    <SuperButton type={'submit'} registrationRegister={true} disabled={isSubmitting}>
                                        <span className={registration.register}>Register</span>
                                    </SuperButton>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
})

export default Registration