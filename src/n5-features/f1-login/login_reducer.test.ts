import {login, loginReducer} from "./login_reducer";
import {LoginResponse} from "../../n3-api/loginAPI";


export let startState: LoginResponse & {isLogged: boolean }

beforeEach(() => {
    startState = {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '',
        isLogged: false
    }
})

test('isLogged should be true',  () => {
    const data = {
        _id: '12',
        email: 'worlddesign1987@gmail.com',
        name: 'Naytin',
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: true,
        error: '',
    }

    const endState = loginReducer(startState, login(data))
    // expectation
    expect(endState.isLogged).toBe(true)
})

test('loginReducer must be changed', () => {
    const data = {
        _id: '12',
        email: 'worlddesign1987@gmail.com',
        name: 'Naytin',
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: true,
        error: '',
    }

    const endState = loginReducer(startState, login(data))

    expect(startState.email).toBe('')
    expect(endState.email).toBe(data.email)
    expect(endState.isLogged).toBeTruthy()
})



