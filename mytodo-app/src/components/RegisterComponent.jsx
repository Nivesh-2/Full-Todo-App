import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from "react";
import UserService from "../model/UserService.js";

class RegisterComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      userName: "",
      password: "",
      reEnter: "",
    };

    this.submit = this.submit.bind(this);
  }

  validate(value) {
    let err = {};
    if (value.userName === "") {
      err.userName = "Please Enter you email";
    }
    if (value.name === "") {
      err.name = "Please Enter you name";
    }
    if (value.password === "") {
      err.password = "Please enter password";
    } else if (value.password.length < 8) {
      err.password = "Password should contain atleast 8 characters";
    }
    if (value.password !== value.reEnter) {
      err.reEnter = "Please check re-entered password";
    }
    return err;
  }

  submit(value) {
    const user = {
      name: value.name,
      email: value.userName,
      password: value.password
    };
    console.log(user);
    UserService.registerUser(user)
      .then((res) => {
        console.log(res);
        this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <div className="login-card">
          <h1>Register</h1>
          <Formik
            initialValues={{
              name: this.state.name,
              userName: this.state.userName,
              password: this.state.password,
              reEnter: this.state.reEnter,
            }}
            validate={this.validate}
            onSubmit={this.submit}
          >
            <Form>
              <ErrorMessage
                className="alert alert-warning"
                name="name"
                component="div"
              ></ErrorMessage>
              <ErrorMessage
                className="alert alert-warning"
                name="userName"
                component="div"
              ></ErrorMessage>
              <ErrorMessage
                className="alert alert-warning"
                name="password"
                component="div"
              ></ErrorMessage>
              <ErrorMessage
                className="alert alert-warning"
                name="reEnter"
                component="div"
              ></ErrorMessage>
              <fieldset className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" className="form-control"></Field>
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="userName">Email</label>
                <Field
                  type="email"
                  name="userName"
                  className="form-control"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="reEnter">Re-enter Password</label>
                <Field
                  type="password"
                  name="reEnter"
                  className="form-control"
                ></Field>
              </fieldset>
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

export default RegisterComponent;
