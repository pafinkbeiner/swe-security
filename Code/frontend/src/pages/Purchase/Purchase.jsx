import React, { Component } from 'react'
import Alert from "../../components/Alert/Alert"

export default class Purchase extends Component {
    render() {

        if(this.props.url != undefined){

            if(this.props.checksum == undefined){
                return (
                    <div>
                        <h1>Your Download can be redeemed here: </h1>
                        <a href={this.props.url}></a>
                        <br/>
                        <h3>Please verify you download with the following checksum:</h3>
                        <p>{this.props.checksum}</p>
                    </div>
                )
            }else{
                return (
                    <div>
                        <h1>Your Download can be redeemed here: </h1>
                        <a href={this.props.url}></a>
                    </div>
                )
            }

        }else{
            <Alert message="No url could be found!"/>
        }
    }
}
