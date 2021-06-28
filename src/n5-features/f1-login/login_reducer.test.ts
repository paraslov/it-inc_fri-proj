import {loginReducer, setAuthUserDataAction, UserDataType} from "./login_reducer";


export let startState: UserDataType

beforeEach(() => {
    startState = {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        isAuth: false
    }
})

test('isAuth should be true',  () => {
    const data = {
        _id: '12',
        email: 'worlddesign1987@gmail.com',
        name: 'Naytin',
        avatar: '',
        publicCardPacksCount: 0,
        isAuth: true
    }

    const endState = loginReducer(startState, setAuthUserDataAction(data))
    // expectation
    expect(endState.isAuth).toBe(true)
})

test('loginReducer must be changed', () => {
    const data = {
        _id: '12',
        email: 'worlddesign1987@gmail.com',
        name: 'Naytin',
        avatar: '',
        publicCardPacksCount: 0,
        isAuth: true
    }

    const endState = loginReducer(startState, setAuthUserDataAction(data))

    expect(startState.email).toBe(null)
    expect(endState.email).toBe(data.email)
})



