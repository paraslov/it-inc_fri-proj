import React from 'react'
import './App.css'
import {Routes} from '../a2-routes/Routes'
import {HashRouter} from 'react-router-dom'

export const App = () => {
    return (
        <HashRouter>
            <div className="App">
                <h6>FP.v.1.03</h6>
                <Routes/>
            </div>
        </HashRouter>
    )
}