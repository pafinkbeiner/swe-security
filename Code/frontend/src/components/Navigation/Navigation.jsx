import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "../Navigation/Navigation.scss"

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = { redirect: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (e) => {
    e.preventDefault();

    localStorage.removeItem("key");

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect != undefined) {
      return <Redirect to={"/"} />;
    } else {
      return (
        <nav className="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand">SWE SHOP</a>
          <ul className="navbar-nav mr-auto ml-4 ">
            <li className="nav-item">
              <Link className="nav-link" to="/items">
                Items
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
          </ul>
          <form className="form-inline" onSubmit={this.onSubmit}>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Logout
            </button>
          </form>
        </nav>
      );
    }
  }
}
