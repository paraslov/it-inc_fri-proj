import {instance} from './api'


export const passwordAPI = {
    restorePassword(email: string) {
        return instance.post('auth/forgot', {email}).then(res => res.data)
    }
}

// export const testAPI = {
//     registration() {
//         return instance.post('auth/register', {email: 'tsfoe@mail.ru', password: 'Yo1405HoHo'}).then(res => res.data)
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