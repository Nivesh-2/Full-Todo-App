import React, { Component } from "react";
import TodoServices from "../model/TodoService.js";
import HeaderComponent from "./HeaderComponent";
import moment from "moment";
import AuthenticationService from "../model/AuthenticationService";

class ShowTodos extends Component {
  constructor() {
    super();
    this.state = {
      completed: [],
      today: [],
      upcoming: [],
    };
    this.moveToHome = this.moveToHome.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let date = moment(new Date()).format("YYYY-MM-DD");
    // console.log(date);
    let accessToken = AuthenticationService.getAccessToken();
    accessToken = "Bearer " + accessToken;
    const options = {
      headers: { authentication: accessToken },
    };
    TodoServices.getTodos(options)
      .then((res) => {
        const todos = res.data;
        let dueTodos = [];
        let upcoming = [];
        let completed = [];

        todos.forEach((todo) => {
          if (todo.targetDate === date) {
            dueTodos.push(todo);
          } else if (todo.targetDate > date) {
            upcoming.push(todo);
          } else {
            completed.push(todo);
          }
        });

        let cls = { due: dueTodos, upcoming: upcoming, completed: completed };
        // console.log(cls);
        this.setState({
          today: cls.due,
          upcoming: cls.upcoming,
          completed: cls.completed,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // let cls = TodoService.classifyTodos(date);
    // console.log(todo);
  }

  moveToHome() {
    this.props.history.push("/");
  }

  logout() {
    AuthenticationService.logout();
    this.props.history.push("/login");
  }

  render() {
    let prev = this.state.completed.map((todo) => {
      return (
        <tr key={todo._id}>
          <td>{todo.description}</td>
          <td>{todo.targetDate}</td>
        </tr>
      );
    });

    let today = this.state.today.map((todo) => {
      return (
        <tr key={todo._id}>
          <td>{todo.description}</td>
          <td>{todo.targetDate}</td>
        </tr>
      );
    });

    let upcoming = this.state.upcoming.map((todo) => {
      return (
        <tr key={todo._id}>
          <td>{todo.description}</td>
          <td>{todo.targetDate}</td>
        </tr>
      );
    });

    return (
      <>
        <HeaderComponent
          title="Home"
          Clicked={this.moveToHome}
          logout={this.logout}
        />
        <div className="Todo-list-main-div">
          <div className="Person">
            <h1>Due Today</h1>
            {this.state.today.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Target Date</th>
                  </tr>
                </thead>
                <tbody>{today}</tbody>
              </table>
            )}
            {this.state.today.length <= 0 && <p>Add Todos...</p>}
          </div>
          <div className="Person">
            <h1>Upcoming</h1>
            {this.state.upcoming.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Target Date</th>
                  </tr>
                </thead>
                <tbody>{upcoming}</tbody>
              </table>
            )}
            {this.state.upcoming.length <= 0 && <p>Add Todos...</p>}
          </div>
          <div className="Person">
            <h1>Completed</h1>
            {this.state.completed.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Target Date</th>
                  </tr>
                </thead>
                <tbody>{prev}</tbody>
              </table>
            )}
            {this.state.completed.length <= 0 && <p>Add Todos...</p>}
          </div>
        </div>
      </>
    );
  }
}

export default ShowTodos;
