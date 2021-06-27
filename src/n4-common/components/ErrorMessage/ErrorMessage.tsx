import React, {ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes} from 'react'
import s from './MessageError.module.css'


type DefaultPropsType = HTMLAttributes<HTMLDivElement>

const ErrorMessage: React.FC<DefaultPropsType> =
    React.memo(({
                    className,
                    ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
                }) => {

        const finalClassName = `${className ? className : ''} ${s.box__message}`;
        return <div className={finalClassName} {...restProps}/>
    })

export default ErrorMessage