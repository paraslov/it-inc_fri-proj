import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    registrationCancel?: boolean
    registrationRegister?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, registrationCancel, registrationRegister, className, disabled,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    const finalClassName = disabled ? `${s.disabled} ${className}` : `${s.default} ${red ? s.red : ''} ${registrationCancel ? s.registrationCancel : ''} ${className}`

    return (
        <button
            disabled={disabled}
                className={finalClassName}
                {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
