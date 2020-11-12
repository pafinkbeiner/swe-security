import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.scss";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.canLogin = this.canLogin.bind(this);
  }

  canLogin() {
    return this.state.email.length === 0 || this.state.password.length === 0;
  }

  onSubmit() {}

  render() {
    return (
      <div className="background">
        <div className="login">
          <form onSubmit={this.onSubmit}>
            <FormGroup controlId="email" className="form-row">
              <FormControl
                type="text"
                value={this.state.email}
                size="lg"
                placeholder="E-Mail"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup controlId="password" className="form-row">
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Passwort"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormGroup>
            <FormGroup controlId="button" className="form-row">
              <Button bsSize="large" block disabled={this.canLogin} type="submit">
                Login
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}
