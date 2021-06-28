//* ============================================================= Initial state =====================================>>
import {TBaseThunk} from '../../n2-bll/store'

const initState = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
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

//* =============================================================== Types ===========================================>>

export type TProfileReducerActions = ReturnType<typeof setUserData>

type TThunk = TBaseThunk<TProfileReducerActions>

export type UserDataType = {
    _id: null | string,
    email: null | string,
    name: null | string,
    avatar: null | string,
    publicCardPacksCount: null | number,
}
