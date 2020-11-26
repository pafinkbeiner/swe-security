import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.scss";
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      mail: "",
      redirect: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  canLogin() {
    return this.state.username.length === 0 || this.state.password.length === 0;
  }

  onSubmit = (e) =>{

    e.preventDefault();

    axios.post('http://localhost:5001/register',{
        username: this.state.username,
        password: this.state.password,
        mail: this.state.mail
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
              <div className="login">
                <form onSubmit={this.onSubmit}>
      
                  <input type="text" value={this.state.username} placeholder="username" onChange={(e) => this.setState({ username: e.target.value })}></input>
                  <input type="password" value={this.state.password} placeholder="password" onChange={(e) => this.setState({ password: e.target.value })}></input>
                  <input type="mail" value={this.state.mail} placeholder="mail" onChange={(e) => this.setState({ mail: e.target.value })}></input>
                  <input type="submit"></input>
      
                </form>
              </div>
            </div>
          );
    }
  }
}
