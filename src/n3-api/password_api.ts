import {instance} from './api'

export type TSetNewPasswordData = {
    password: string
    resetPasswordToken: string
}

export const passwordAPI = {
    restorePassword(email: string) {
        return instance.post('auth/forgot', {email}).then(res => res.data)
    },
    setNewPassword(payload: TSetNewPasswordData) {
        return instance.post('auth/set-new-password', payload).then((res => res.data))
    }
}


//* ============================= Temp registration requests for tests ==================>>

// export const testAPI = {
//     registration() {
//         return instance.post('auth/register', {email: 'tsfoe@mail.ru', password: 'Fb777666'}).then(res => res.data)
//     }
// }


// addedUser:
//     created: "2021-06-26T04:21:39.032Z"
// email: "tsfoe@mail.ru"
// isAdmin: false
// name: "tsfoe@mail.ru"
// publicCardPacksCount: 0
// rememberMe: false
// updated: "2021-06-26T04:21:39.032Z"
// verified: false
// __v: 0
// _id: "60d6ab539fa2b22e6cdcf70c"