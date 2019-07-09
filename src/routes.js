import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Post from './Components/Post/Post';

export default (
    <Switch>
        <Route exact path= '/' component={Auth} />
        <Route path= '/post' component={Post} />
        <Route path= 'Dashboard/:id' component={Dashboard} />
    </Switch>
)