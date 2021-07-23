import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "../model/AuthenticationService.js";

class AuthenticateRoute extends Component {
    render(){
        if(AuthenticationService.isUserLoggedIn()){
            return(<Route {...this.props} />)
        }
        else{
            return(<Redirect to="/login" />);
        }
    }
}

export default AuthenticateRoute;