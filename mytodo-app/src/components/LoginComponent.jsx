import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../model/UserService.js";
import AuthenticationService from "../model/AuthenticationService";

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errMessage: "",
    };

    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);

  }

  validate(value) {
    let err = {};
    if (value.userName === "") {
      err.userName = "Please enter username";
    }
    if (value.password === "") {
      err.password = "Please enter password";
    }
    if (value.password.length < 8) {
      err.password = "Password should be atleast 8 chars";
    }
    return err;
  }

  submit(value) {
    const user = { email: value.userName, password: value.password };
    // console.log(user);
    UserService.authenticateUser(user)
      .then((res) => {
        console.log(res);
        AuthenticationService.authenticateUser(res.data.accessToken);
        this.props.history.push('/');
      })
      .catch((err) => {
        // console.log(err);
        if (err.response) {
          // console.log(err.response.data);
          if(err.response.data === 'Unauthorized'){
            this.setState({errMessage: 'Wrong UserId or Password'});
          }
          if(err.response.data.failed === 'wrong password'){
            this.setState({errMessage: 'Wrong Password'});
          }
        }
      });
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="login-card">
            <h1 style={{ padding: "5px" }}>Login</h1>
            {this.state.errMessage && <div className="alert alert-warning">{this.state.errMessage}</div>}
            <Formik
              initialValues={{
                userName: this.state.userName,
                password: this.state.password,
              }}
              validate={this.validate}
              onSubmit={this.submit}
            >
              <Form className="form">
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
                <fieldset className="form-group">
                  <label htmlFor="userName">User Name</label>
                  <Field
                    type="email"
                    className="form-control"
                    name="userName"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                  ></Field>
                </fieldset>
                <button type="submit" className="btn btn-success mr-3">
                  Login
                </button>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </>
    );
  }
}

export default LoginComponent;
