import React, { Component } from "react";
import AuthenticationService from "../model/AuthenticationService.js";
import TodoServices from "../model/TodoService.js";
import HeaderComponent from "./HeaderComponent";

class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };

    this.moveToAddTodo = this.moveToAddTodo.bind(this);
    this.logout = this.logout.bind(this);
    this.loadState = this.loadState.bind(this);
  }

  componentDidMount() {
    this.loadState();
  }

  loadState() {
    let accessToken = AuthenticationService.getAccessToken();
    accessToken = "Bearer " + accessToken;
    const options = {
      headers: { authentication: accessToken },
    };
    TodoServices.getTodos(options)
      .then((res) => {
        console.log(res);
        this.setState({ todos: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  moveToAddTodo() {
    this.props.history.push("/addTodo/-1");
  }

  logout() {
    AuthenticationService.logout();
    this.props.history.push("/login");
  }

  onDelete(id) {
    let accessToken = AuthenticationService.getAccessToken();
    accessToken = "Bearer " + accessToken;
    const options = {
      headers: { authentication: accessToken },
    };
    TodoServices.deleteTodo(id, options)
      .then((res) => {
        //console.log(res);
        this.loadState();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onUpdate(id) {
    this.props.history.push(`/addTodo/${id}`);
  }

  render() {
    const todos = this.state.todos.map((todo) => {
      return (
        <tr key={todo._id}>
          <td>{todo.description}</td>
          <td>{todo.targetDate}</td>
          <td>
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.onDelete(todo._id)}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              className="btn btn-outline-info"
              onClick={() => this.onUpdate(todo._id)}
            >
              Update
            </button>
          </td>
        </tr>
      );
    });

    return (
      <>
        <HeaderComponent
          title="Add Todo"
          Clicked={this.moveToAddTodo}
          logout={this.logout}
        />
        <div className="container cont">
          {this.state.todos.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Target Date</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>{todos}</tbody>
            </table>
          )}
          {this.state.todos.length <= 0 && <h3>Add Todos ... </h3>}
          
        </div>
      </>
    );
  }
}

export default TodoComponent;
