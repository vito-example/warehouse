import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'
import 'antd/dist/antd.js'
import {ToastContainer} from "react-toastify";
import './App.scss';
import NavLeft from "./components/NavLeft/NavLeft";
import CHeader from "./components/Header/Header";
import Supplier from "./modules/Supplier/Supplier";
import Layout, {Content, Footer} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const App =() => (
    <Provider store={store}>
        <Router>
            <Route exact path='/'>
                <Redirect to='/supplier'/>
            </Route>
            <Layout className="layout-wrapper">
                <Sider className="nav" trigger={null} collapsible collapsed={false}>
                    <NavLeft/>
                </Sider>
                <Layout className="main-wrapper">
                    <CHeader/>
                    <Content className="content">
                        <ToastContainer />
                        <Switch>
                            <Route exact path="/supplier" component={Supplier}/>
                        </Switch>
                    </Content>
                    <Footer className="footer">
                        <p>Copyright © 2021</p>
                    </Footer>
                </Layout>
            </Layout>
        </Router>
    </Provider>
)

export default App;
