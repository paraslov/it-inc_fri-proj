import React from 'react'
import './App.css'
import {Routes} from '../a2-routes/Routes'
import {HashRouter} from 'react-router-dom'
import {NavBar} from '../../n4-common/components/c1-Navbar/NavBar'
import {useSelector} from "react-redux";
import {TAppState} from "../../n2-bll/store";
import {Preloader} from "../../n4-common/components/c2-Preloader/Preloader";
import ErrorMessage from "../../n4-common/components/с3-ErrorMessage/ErrorMessage";

export const App = () => {
    const isFetching = useSelector<TAppState>(state => state.app.isFetching)
    const error = useSelector<TAppState, string | null>(state => state.app.error)
    console.log(error)
    return (
        <HashRouter>
            <div className="App">
                {isFetching && <Preloader left={'calc(50% - 50px)'}/>}
                <h6>FP.v.1.08</h6>
                <NavBar/>
                <Routes/>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
        </HashRouter>
    )
}