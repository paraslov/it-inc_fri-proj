//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'

const initState = {
    isFetching: false,
    error: null as ErrorMessageType,
}

export const appReducer = (state: TState = initState, action: TAppReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/passwordReducer/SET_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'para-slov/appReducer/SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
/**
 * Preloader is already created in src/n4-common/c2-Preloader/Preloader.tsx !!
 */
export const setIsFetching = (isFetching: boolean) =>
    ({type: 'para-slov/passwordReducer/SET_IS_FETCHING', isFetching} as const)
export const setAppError = (error: string | null) => ({type: 'para-slov/appReducer/SET_ERROR', error} as const)

//* =============================================================== Thunk creators ==================================>>


//* =============================================================== Types ===========================================>>

export type TState = typeof initState
export type ErrorMessageType = string | null
export type TAppReducerActions = ReturnType<typeof setIsFetching> | ReturnType<typeof setAppError>

type TThunk = TBaseThunk<TAppReducerActions>