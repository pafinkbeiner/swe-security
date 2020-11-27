import React, { Component } from 'react'

export default class Alert extends Component {

    constructor(){
        super();
    }

    render() {
        return (
            <div class="alert alert-primary" role="alert">
                { this.props.message ? this.props.message : "alert!"}
            </div>
        )
    }
}
