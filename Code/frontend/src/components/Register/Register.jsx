import React, { Component } from "react";
import {useHistory} from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.scss";

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

  onSubmit = (e) =>{

    e.preventDefault();

    console.log(this.state.username);
    console.log(this.state.password);

    const auth = false;

    if(auth){
        this.props.history.push("/items");
    }else{
        this.props.history.push("/it");
    }

  }

  render() {
    return (
      <div className="background">
        <div className="login">
          <form onSubmit={this.onSubmit}>

            <input type="text" value={this.state.username} placeholder="username" onChange={(e) => this.setState({ username: e.target.value })}></input>
            <input type="password" value={this.state.password} placeholder="password" onChange={(e) => this.setState({ password: e.target.value })}></input>
            <input type="submit"></input>

          </form>
        </div>
      </div>
    );
  }
}
