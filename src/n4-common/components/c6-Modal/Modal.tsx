import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Modal.module.css'

type DefaultModalPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ModalPropsType = DefaultModalPropsType & {
    children?: React.ReactNode
    title?: string
}

const Modal: React.FC<ModalPropsType> = (
    {
        title,
        children,
         className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children

    }
) => {
    return (
        <div className={s.wrapper} >
            <div className={s.form__block}>
                <div className={s.title__wrapper}>
                    <h4 className={s.title}>{title}</h4>
                    <button className={s.button}>
                        <span className={s.button__line +' ' + s.button__line_first}/>
                        <span className={s.button__line +' ' + s.button__line_second}/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
