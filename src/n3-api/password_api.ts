import {instance} from './api'

export type TSetNewPasswordData = {
    password: string
    resetPasswordToken: string
}

const emailMessage = {
    paraSlovGH: `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                <a href='https://paraslov.github.io/it-inc_fri-proj/#/set-new-password/$token$'>
                    https://paraslov.github.io/it-inc_fri-proj/#/set-new-password/$token$
                </a></div>`,
    local: undefined
}

export const passwordAPI = {
    restorePassword(email: string) {
        return instance.post('auth/forgot', {email, from: '', message: emailMessage.paraSlovGH}).then(res => res.data)
    },
    setNewPassword(payload: TSetNewPasswordData) {
        return instance.post('auth/set-new-password', payload).then((res => res.data))
    }
}