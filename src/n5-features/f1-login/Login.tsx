import React, {useEffect, useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import style from './Login.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import SuperButton from "../../n4-common/components/Elements/e1-SuperButton/SuperButton";
import {useFormik} from 'formik';
import SuperCheckbox from "../../n4-common/components/Elements/e2-SuperCheckboxe/SuperCheckbox";
import {loginThunk, registerThunk} from "./login_reducer";
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../n2-bll/store";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = React.memo(() => {
    const isAuth = useSelector<TAppState>(state => state.login.isAuth)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(registerThunk({email: 'worlddesign1987@gmail.com', password: '12345678'}))
    // },[])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'password must be more than 7 character';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginThunk(values))
            formik.resetForm()
        },
    });

    if(isAuth) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={style.form__block}>
            <h3 className={style.from__block_title}>It-incubator</h3>
            <p className={style.form__block_text}>Sign In</p>
            <div className={style.form__block_content}>
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                    className={style.form__style}
                   >
                    <label>Email</label>
                    <input
                        autoComplete='email'
                        className={style.form__style_input}
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    <label>Password</label>
                    <input
                        autoComplete='current-password'
                        type="password"
                        placeholder="*********"
                        className={style.form__style_input}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    <SuperCheckbox
                        {...formik.getFieldProps('rememberMe')}
                        >Remember me
                    </SuperCheckbox>
                    <div className={style.button__group}>
                        <NavLink to={PATH.ENTER_NEW_PASSWORD} className={`${style.form__link} ${style.forgot}`}>Forgot Password?</NavLink>
                        <SuperButton className={style.btn} type="submit" name="form_login_submit">Login</SuperButton>
                        <p className={style.form__text}>Don’t have an account?</p>
                        <NavLink to={PATH.REGISTRATION} className={`${style.form__link } ${style.signUp}`}>Sign Up</NavLink>
                    </div>
                </form>

            </div>

        </div>

)
})