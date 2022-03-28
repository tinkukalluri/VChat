import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

import Login from "./Login.js"
import SignUp from "./SignUp"
import HomePage from "./Homepage.js"
import Contacts from "./Contacts.js"


export default function Routers(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path='' component={HomePage} />
                <Route exact path='/contacts' component={Contacts} />
            </Switch>
        </Router>
    );
}