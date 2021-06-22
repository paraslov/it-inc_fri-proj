import React from 'react'
import './App.css'
import {Routes} from '../a2-routes/Routes';
import {HashRouter} from 'react-router-dom';

function App() {
    return (
        <HashRouter>
            <div className="App">
                FRI_PROJ
                <Routes/>
            </div>
        </HashRouter>
    )
}

export default App
