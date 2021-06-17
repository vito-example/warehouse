import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from "./store";

import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'
import 'antd/dist/antd.js'
import {ToastContainer} from "react-toastify";
import './App.scss';

const App =() => (
    <Provider store={store}>

    </Provider>
)

export default App;
