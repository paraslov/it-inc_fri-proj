import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {appReducer, TAppReducerActions} from '../n1-app/a1-app/app_reducer'
import {loginReducer, TLoginReducerActions} from '../n5-features/f1-login/login_reducer'
import {registrationReducer, TRegistrationReducerActions} from '../n5-features/f2-registration/registration_reducer'
import {profileReducer, TProfileReducerActions} from '../n5-features/f3-profile/progile_reducer'
import {passwordReducer, TPasswordReducerActions} from '../n5-features/f4-password/password_reducer'


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    password: passwordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type TAppState = ReturnType<typeof rootReducer>

//* Common actions type =============================================================================================>>
export type TAppActions = TAppReducerActions | TLoginReducerActions | TRegistrationReducerActions
    | TProfileReducerActions | TPasswordReducerActions

//* Common thunk type ===============================================================================================>>
export type TBaseThunk<A extends Action = TAppActions, R = void> = ThunkAction<R, TAppState, unknown, A>