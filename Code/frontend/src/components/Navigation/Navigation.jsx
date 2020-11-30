import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "../Navigation/Navigation.scss"
import axios from "axios"

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = { redirect: undefined, user: undefined };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){

    axios
      .get(`${process.env.REACT_APP_API_URL}/decodeJWT`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` }, 
      })
      .then((res) => {
        if (res) {
          this.setState({ user: res.data });
        } else {
          this.setState({user: undefined});
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  onSubmit = (e) => {
    e.preventDefault();

    localStorage.removeItem("key");

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect != undefined) {
      return <Redirect to={"/login"} />;
    } else {
      return (
        <nav className="navbar navbar-light bg-light navbar-expand-lg justify-content-between">
          <a className="navbar-brand">SWE SHOP</a>
          <ul className="navbar-nav mr-auto ml-4 ">
            <li className="nav-item">
              <Link className="nav-link" to="/items">
                Items
              </Link>
            </li>
            { 
              (this.state.user != undefined && this.state.user.role == 1) &&
              <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
            }

          </ul>
          {  
            localStorage.getItem("key") == undefined ? 
            
            <form className="form-inline" onSubmit={this.onSubmit}>
            <Link
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit" to="/register"
            >
              Register
            </Link>
            </form>

            :

            <form className="form-inline" onSubmit={this.onSubmit}>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Logout
            </button>
          </form>

          }
        </nav>
      );
    }
  }
}
