//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'

const initState = {
    isFetching: false,
}

export const appReducer = (state: TState = initState, action: TAppReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/passwordReducer/SET_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
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

//* =============================================================== Thunk creators ==================================>>


//* =============================================================== Types ===========================================>>

export type TState = typeof initState

export type TAppReducerActions = ReturnType<typeof setIsFetching>

type TThunk = TBaseThunk<TAppReducerActions>
