import React, {useEffect} from 'react'
import './App.css'
import {Routes} from '../a2-routes/Routes'
import {HashRouter} from 'react-router-dom'
import {NavBar} from '../../n4-common/components/c1-Navbar/NavBar'
import {useDispatch, useSelector} from 'react-redux'
import {TAppState} from '../../n2-bll/store';
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader';
import ErrorMessage from '../../n4-common/components/с3-ErrorMessage/ErrorMessage';
import {initializeApp} from './app_reducer'

export const App = () => {
    const dispatch = useDispatch()

    const isInitialized = useSelector<TAppState>(state => state.app.isInitialized)
    const error = useSelector<TAppState, string | null>(state => state.app.error)

    useEffect(() => {
        if(!isInitialized) dispatch(initializeApp())
    }, [dispatch])

    // if app is not initialized yet show preloader
    if (!isInitialized) return <Preloader left={'40%'} top={'40%'} size={'200px'}/>

    return (
        <HashRouter>
            <div className="App">
                <NavBar/>
                <Routes/>
                <h6>FP.v.2.04</h6>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
        </HashRouter>
    )
}