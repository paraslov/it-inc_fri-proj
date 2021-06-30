//* ============================================================= Initial state =====================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {loginAPI, UserData} from "../../n3-api/loginAPI";
import {setAppError, setIsFetching} from "../../n1-app/a1-app/app_reducer";

const initState = {
    _id: null,
    email: null,
    name: '',
    avatar: '',
    publicCardPacksCount: null,
}

export const profileReducer = (state: UserDataType = initState, action: TProfileReducerActions): UserDataType => {
    switch (action.type) {
        case 'para-slov/profileReducer/SET_USER_DATA':
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const setUserData = (data: UserDataType) => ({type: 'para-slov/profileReducer/SET_USER_DATA', data} as const)

//* =============================================================== Thunk creators ==================================>>

export const changeUserData = (userData: UserData):TThunk => dispatch => {
    dispatch(setIsFetching(true))
    loginAPI.changeData(userData)
        .then(res => {
            if (res.status === 200) {
                dispatch(setUserData(res.data.updatedUser))
            } else {
                console.log('something went wrong', res)
            }
        }).catch(error => {
            dispatch(setAppError(error.response.data.error))
            dispatch(setIsFetching(false))
    })
}

//* =============================================================== Types ===========================================>>

export type TProfileReducerActions =
    ReturnType<typeof setUserData> |
    ReturnType<typeof setIsFetching>

type TThunk = TBaseThunk<TProfileReducerActions>

export type UserDataType = {
    _id: null | string,
    email: null | string,
    name:  string,
    avatar: string,
    publicCardPacksCount: null | number,
}
