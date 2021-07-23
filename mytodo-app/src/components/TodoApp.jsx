import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TodoComponent from "./TodoComponent";
import AddTodoComponent from "./AddTodoComponent";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import ShowTodos from "./ShowTodos";
import AuthenticateRoute from "./AuthenticateRoute";

class TodoApp extends Component {
  render() {
    return (
      <div>
        <Router>
          <>
            <Switch>
              <Route path="/login" component={LoginComponent} />
              <Route path="/register" component={RegisterComponent} />
              <AuthenticateRoute exact path="/" component={TodoComponent} />
              <AuthenticateRoute path="/addTodo/:id" component={AddTodoComponent} />
              <AuthenticateRoute path="/show" component={ShowTodos} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default TodoApp;
