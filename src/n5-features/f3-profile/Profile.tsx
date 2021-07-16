import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TAppState} from '../../n2-bll/store'
import {logoutThunk} from '../f1-login/login_reducer'
import {changeUserData, UserDataType} from './progile_reducer'
import s from './Profile.module.css'
import Modal from '../../n4-common/components/c9-Modals/Modal'
import SuperInputText from '../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'

export const Profile = () => {
    const dispatch = useDispatch()
//* ==================================================================================== Data ==================>>
    const isFetching = useSelector<TAppState, boolean>(state => state.app.isFetching)

    const {name, avatar} =
        useSelector<TAppState, UserDataType>(state => state.profile)
//* ==================================================================================== Local state ===========>>
    const [myName, setMyName] = useState('')
    const [myAvatar, setMyAvatar] = useState('Avatar is not defined')
    const [editMode, setEditMode] = useState(false)

// setting start values for local state
    useEffect(() => {
        setMyName(name)
        if (avatar) {
            setMyAvatar(avatar)
        }
    }, [name, avatar])
//* ==================================================================================== Callbacks =============>>
    const logout = () => dispatch(logoutThunk())
    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMyName(e.currentTarget.value)
    }
    const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMyAvatar(e.currentTarget.value)
    }
    const editProfileHandler = () => {
        dispatch(changeUserData({name: myName, avatar: myAvatar}))
        setEditMode(false)
    }

    return (
        <div className={s.profile}>
            <EditProfileModal open={editMode}
                              close={() => setEditMode(false)}
                              avatar={myAvatar} name={myName}
                              onNameChange={changeNameHandler}
                              onAvatarChange={changeAvatarHandler}
                              onClick={editProfileHandler}/>
            <img className={s.profileAvatar} src={avatar} alt="ava"/>
            <span>{name}</span>
            <div className={s.profileEdit} onClick={() => !isFetching && setEditMode(true)}>Edit profile</div>
        </div>
    )
}

type TEditProfileModalProps = {
    open: boolean
    close: () => void
    avatar: string
    name: string
    onNameChange: (e: ChangeEvent<HTMLInputElement>) => void
    onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
}

const EditProfileModal: React.FC<TEditProfileModalProps> = ({
                                                                avatar,
                                                                name,
                                                                open,
                                                                close, onNameChange, onAvatarChange, onClick
                                                            }) => {
    return <Modal closeBtn={true} title={'Personal information'} isOpen={open} close={close} modalBackGround={'pinkFulfilled'}>
        <div className={s.editProfileModal}>
            <img className={s.profileAvatar} src={avatar} alt="ava"/>
            <SuperInputText label={'Nickname'} value={name} onChange={onNameChange}/>
            <SuperInputText label={'Avatar'} value={avatar} onChange={onAvatarChange}/>
            <div className={s.btnSection}>
                <SuperButton width={'150px'}
                             onClick={close}>
                    Cancel
                </SuperButton>
                <SuperButton width={'150px'} onClick={onClick}>
                    Save
                </SuperButton>
            </div>
        </div>
    </Modal>
}