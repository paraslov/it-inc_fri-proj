import {appReducer, setIsFetching, TState} from './app_reducer'

let startState: TState

beforeEach(() => {
    startState = {
        isFetching: false
    }
})

test('isFetching should changes', () => {
    // data
    const isFetching = true

    // action
    const endState = appReducer(startState, setIsFetching(isFetching))

    // expectation
    expect(startState.isFetching).toBeFalsy()
    expect(endState.isFetching).toBeTruthy()
})
