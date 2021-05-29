import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Signup from './components/Signup';


const Routes=()=>
{
    return (
        <Router>
        <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/dashboard" component={DashBoard}></Route>
        </Switch>
        </Router>
      );
}


export default Routes;