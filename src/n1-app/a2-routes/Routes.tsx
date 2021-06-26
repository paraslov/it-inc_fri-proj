import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Login} from '../../n5-features/f1-login/Login'
import {Registration} from '../../n5-features/f2-registration/Registration'
import {Profile} from '../../n5-features/f3-profile/Profile'
import {RestorePassword} from '../../n5-features/f4-password/restore_pw/RestorePassword'
import {SetNewPassword} from '../../n5-features/f4-password/set_new_pw/SetNewPassword'
import {Tests} from '../../n6-tests_and_trash/t1-tests/Tests'

//* ========================================================= Constants for routes ================================>>
export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RESTORE_PASSWORD: '/restore',
    ENTER_NEW_PASSWORD: '/enter_new_password',
    TESTS: '/tests',
    NOT_FOUND: '/404'
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.RESTORE_PASSWORD} render={() => <RestorePassword/>}/>
                <Route path={PATH.ENTER_NEW_PASSWORD} render={() => <SetNewPassword/>}/>
                <Route path={PATH.TESTS} render={() => <Tests/>}/>
                <Route path={PATH.NOT_FOUND} render={() => <h1>404 PAGE NOT FOUND</h1>}/>
                <Route path={'/*'} render={() => <Redirect to={PATH.NOT_FOUND}/>}/>
            </Switch>
        </div>
    )
}