//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'

const initState = {}

export const registrationReducer = (state: TState = initState, action: TRegistrationReducerActions): TState => {
    switch (action.type) {
        case 'para-slov/registrationReducer/SOME_ACTION':
            return state
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _someRegistrationAction = () => ({type: 'para-slov/registrationReducer/SOME_ACTION'} as const)

//* =============================================================== Thunk creators ==================================>>
export const registrationThunk = (): TThunk => dispatch => {
    dispatch(_someRegistrationAction())
}

//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TRegistrationReducerActions = ReturnType<typeof _someRegistrationAction>

type TThunk = TBaseThunk<TRegistrationReducerActions>
