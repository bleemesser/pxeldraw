import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Draw from './Draw';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.css';

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Draw/>}/>
                <Route path="currentuser" element={<App/>}/>
                <Route path="account" element={<Login/>}/>
            </Routes>
    </BrowserRouter>
);


