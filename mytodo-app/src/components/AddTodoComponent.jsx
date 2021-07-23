import React, { Component } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import TodoServices from "../model/TodoService.js";
import HeaderComponent from "./HeaderComponent";
import AuthenticationService from "../model/AuthenticationService.js";

class AddTodoComponent extends Component {
  constructor() {
    super();
    this.state = {
      id: "-1",
      description: "",
      target: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.moveToHome = this.moveToHome.bind(this);
    this.submit = this.submit.bind(this);
    this.loadState = this.loadState.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id === "-1") {
      return;
    } else {
      this.loadState(id);
    }
  }

  loadState(id) {
    let accessToken = AuthenticationService.getAccessToken();
    accessToken = "Bearer " + accessToken;
    const options = {
      headers: { authentication: accessToken },
    };
    TodoServices.getTodo(id, options)
      .then((res) => {
        this.setState({
          id: res.data._id,
          description: res.data.description,
          target: res.data.targetDate,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    AuthenticationService.logout();
    this.props.history.push("/login");
  }

  moveToHome() {
    this.props.history.push("/");
  }

  validate(value) {
    let error = {};
    if (!value.description) {
      error.description = "Write some description";
    }
    if (!moment(value.target).isValid()) {
      error.target = "Provide Target Date";
    }

    return error;
  }

  submit(value) {
    const todo = { description: value.description, targetDate: value.target };
    let accessToken = AuthenticationService.getAccessToken();
    accessToken = "Bearer " + accessToken;
    const options = {
      headers: { authentication: accessToken },
    };
    if (this.state.id === "-1") {
      TodoServices.postTodo(todo, options)
        .then((res) => {
          this.props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      TodoServices.updateTodo(this.state.id, todo, options)
        .then((res) => {
          this.props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    let target = this.state.target;
    let description = this.state.description;
    //console.log(target);
    return (
      <>
        <HeaderComponent
          title="Home"
          Clicked={this.moveToHome}
          logout={this.logout}
        />
        <div className="container cont">
          <Formik
            initialValues={{ description: description, target: target }}
            validate={this.validate}
            onSubmit={this.submit}
            enableReinitialize={true}
          >
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="target"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="target">Target Date</label>
                <Field
                  type="date"
                  className="form-control"
                  name="target"
                ></Field>
              </fieldset>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

export default AddTodoComponent;
