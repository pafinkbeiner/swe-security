import React, { Component } from "react";
import { Redirect } from "react-router-dom";



export default class Navigation extends Component {

    constructor(){
        super();
        this.state = {redirect:null}
        this.onSubmit = this.onSubmit.bind(this);
    }

    
    onSubmit = (e) =>{

        e.preventDefault();

        localStorage.removeItem("key");

        this.setState({redirect: true});

    }

    render(){
        if(this.state.redirect != undefined){

            return <Redirect to={"/"} />

        }else{
            return (
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand">SWE SHOP</a>
                    <form className="form-inline" onSubmit={this.onSubmit} >
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                </nav>
            )
        }

    }

}

