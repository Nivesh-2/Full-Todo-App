import React, { Component } from "react";
import Example from "./Example";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navigation">
          <div className="header-section">
            <ul className="navbar-nav">
              <li>
                <button
                  className="btn btn-outline-primary"
                  onClick={this.props.Clicked}
                >
                  {this.props.title}
                </button>
              </li>

              <li>
                <Link className="btn btn-outline-info" to="/show">
                  Show Todos
                </Link>
              </li>
              <li>
                <button className="btn btn-outline-success" onClick={this.props.logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div>
            <Example />
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderComponent;
