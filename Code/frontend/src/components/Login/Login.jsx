import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.scss";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Alert from "../Alert/Alert"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      err: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.canLogin = this.canLogin.bind(this);
  }

  canLogin() {
    return this.state.username.length === 0 || this.state.password.length === 0;
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((auth) => {
        if (auth) {
          localStorage.setItem("key", auth.data.key);
          this.setState({ redirect: true });
        } else {
          this.setState({
            redirect: null,
            username: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        this.setState({err: true})
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/items"} />;
    } else {
      return (
        <div className="background">
          <Link color="white" to="/register" title="Register">
            Go to Register
          </Link>

          <div className="login">
            <form className="login-form" onSubmit={this.onSubmit}>
              <h1 class="mb-3">Login</h1>
              <div class="input-group mb-3">
                <input
                  type="text"
                  value={this.state.username}
                  placeholder="Username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                  class="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div class="input-group mb-3">
                <input
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  class="form-control"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                />
              </div>

              <input class="btn btn-primary" value="Login" type="submit"></input>
            </form>
          </div>
          { this.state.err && <Alert message="Falsche Daten!"/>}
        </div>
      );
    }
  }
}
