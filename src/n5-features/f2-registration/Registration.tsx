import React from 'react'
import registration from "./Registration.module.css"
import {TAppState} from "../../n2-bll/store";
import {registrationThunk} from "./registration_reducer";
import {connect} from "react-redux";
import {Field, Form, Formik} from 'formik';
import SuperInputTextEmail from "./components/SuperInputTextEmail";
import SuperInputTextPassword from "./components/SuperInputTextPassword";
import SuperButton from "../../n4-common/components/Elements/e1-SuperButton/SuperButton";

type TMapStateToProps = {
    error?: string,
    email: string,
    password: string
}
type TMapDispatchToProps = {
    registrationThunk: (email: string, password: string) => void
}

type ReistrationPropsType = TMapStateToProps & TMapDispatchToProps


const Registration = (props: ReistrationPropsType) => {

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
                            if (values.password1 === values.password2) {
                                props.registrationThunk(values.email, values.password1)
                                setSubmitting(false)
                            }
                            setSubmitting(false)
                        }}>
                        {({isSubmitting}) => (
                            <Form>

                                <div className={registration.inputs}>
                                    <div>
                                        <Field name="email"
                                               error={props.error}
                                               component={SuperInputTextEmail}
                                        />
                                    </div>

                                    <Field name="password1"
                                           component={SuperInputTextPassword}
                                           error={props.error}
                                           placeholder={"Password"}
                                    />
                                    <Field name="password2"
                                           component={SuperInputTextPassword}
                                           error={props.error}
                                           placeholder={"Password"}
                                    />
                                </div>
                                <div className={registration.buttons}>
                                    <SuperButton type={'reset'} registrationCancel={true}>
                                        <span className={registration.cancel}>Cancel</span>
                                    </SuperButton>
                                    <SuperButton registrationRegister={true}>
                                        <span className={registration.register}>Register</span>
                                    </SuperButton>
                                </div>

                                {/*<div className={registration.buttons}>
                                <div>

                                    <SuperButton
                                        registrationCancel={true}>
                                        <span className={registration.cancel}>Cancel</span>
                                    </SuperButton>
                                </div>
                                <div>
                                    <SuperButton>
                                        <span className={registration.register}>Register</span>
                                    </SuperButton>
                                </div>
                            </div>*/}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state: TAppState): TMapStateToProps => ({
    error: state.registration.error,
    email: state.registration.email,
    password: state.registration.password
})

export default connect(mapStateToProps, {registrationThunk})(Registration)