import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.scss";
import axios from 'axios';
import {Redirect, Link} from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.canLogin = this.canLogin.bind(this);
  }

  canLogin() {
    return this.state.username.length === 0 || this.state.password.length === 0;
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5001/login',{
        username: this.state.username,
        password: this.state.password,
    }).then(auth => {

        if(auth){
            localStorage.setItem('key', auth.data.key);
            this.setState({redirect: true})
        }else{
            this.setState({
                redirect: null,
                username: "",
                password: ""
            });
        }
    }).catch(err => {
        console.log(err);
    });
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to={"/items"} />
  }else{
    return (
      <div className="background">
                <Link color="white" to="/register" title="Register" >
                <button>Register</button>
              </Link>
        <div className="login">
          <form onSubmit={this.onSubmit}>
            <FormGroup controlId="username" className="form-row">
              <FormControl
                type="text"
                value={this.state.username}
                size="lg"
                placeholder="username"
                onChange={(e) => this.setState({ username: e.target.value })}
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
}
