import React, { Component } from 'react'

export default class Alert extends Component {

    constructor(){
        super();
        this.state = {
          show: true
        }
    }

    componentDidMount(){
      //setTimeout(() => {this.setState({show: false})}, 5000)
    }

    render() {
        if(this.state.show == true){
          return (
            <div class="alert alert-warning fixed-top" role="alert">
                { this.props.message ? this.props.message : "An error occured while performing the operation!"}
            </div>
        )
        }else{
          return <></>
        }

    }
}
