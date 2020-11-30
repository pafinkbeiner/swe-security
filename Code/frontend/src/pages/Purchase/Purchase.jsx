import React, { Component } from 'react'
import Alert from "../../components/Alert/Alert"
import Navigation from "../../components/Navigation/Navigation"
import axios from "axios";

export default class Purchase extends Component {

    constructor(props) {
        super(props);
        this.state = {
          item: undefined,
        };
      }
    
      componentDidMount() {

        axios
          .get(`${process.env.REACT_APP_API_URL}/items/${this.props.match.params.name}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
          })
          .then((res) => {
            this.setState({ item: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    

    render() {

        if(this.state.item != undefined){

            if(this.state.item.sha265Sum != undefined){
                return (
                    <div>
                        <Navigation/>
                        <div className="container mt-5">
                            <h1>Your Download can be redeemed here: </h1>
                            <a href={this.state.item.downloadLink}>Click here to download!</a>
                            <br/><br/>
                            <h3>Please verify you download with the following checksum:</h3>
                            <p>{this.state.item.sha265Sum}</p>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div>
                        <Navigation/>
                        <div className="container mt-5">
                            <h1>Your Download can be redeemed here: </h1>
                            <a href={this.state.item.downloadLink}>Click here to download!</a>
                        </div>
                    </div>
                )
            }

        }else{
            return <Alert message="No download url could be found!"/>
        }
    }
}
