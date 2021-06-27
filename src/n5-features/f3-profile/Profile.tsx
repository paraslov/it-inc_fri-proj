import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../n2-bll/store";
import {authThunk} from "../f1-login/login_reducer";
import {PATH} from "../../n1-app/a2-routes/Routes";
import {Redirect} from "react-router-dom";
import {Preloader} from "../../n4-common/components/c2-Preloader/Preloader";


export const Profile = () => {
    const isAuth = useSelector<TAppState>(state => state.login.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        // if userData not found, send request to auth/me
        if(!isAuth) {
            dispatch(authThunk())
        }
    },[])

    //if userData not found redirect to login page
    if(!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
            Profile page.
        </div>
    )
}