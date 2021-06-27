import React from 'react'
import './App.css'
import {Routes} from '../a2-routes/Routes'
import {HashRouter} from 'react-router-dom'
import {NavBar} from '../../n4-common/components/c1-Navbar/NavBar'
import {useSelector} from "react-redux";
import {TAppState} from "../../n2-bll/store";
import {Preloader} from "../../n4-common/components/c2-Preloader/Preloader";


//fgfgf
export const App = () => {
    const isFetching = useSelector<TAppState>(state => state.app.isFetching)
    return (
        <HashRouter>
            <div className="App">
                {isFetching && <Preloader left={'calc(50% - 50px)'}/>}
                <h6>FP.v.1.05</h6>
                <NavBar/>
                <Routes/>
            </div>
        </HashRouter>
    )
}