import React from 'react'
import './App.css'
import {Routes} from '../a2-routes/Routes'
import {HashRouter} from 'react-router-dom'
import {NavBar} from '../../n4-common/components/c1-Navbar/NavBar'

export const App = () => {
    return (
        <HashRouter>
            <div className="App">
                <h6>FP.v.1.08</h6>
                <NavBar/>
                <Routes/>
            </div>
        </HashRouter>
    )
}