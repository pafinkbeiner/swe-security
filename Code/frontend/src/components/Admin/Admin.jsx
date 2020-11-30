import React, { Component } from 'react'
import axios from "axios";

export default class Admin extends Component {

    constructor(){
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_URL}/admin`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("key")}` }
        }).then(res => {
        
            let temp = [];

            Object.keys(res.data).forEach(element => {
                temp.push(res.data[element]);
            });

            this.setState({users: temp});

        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Password Hash</th>
                        <th scope="col">Role</th>
                        <th scope="col">Bought Items</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                            this.state.users != undefined ? this.state.users.map(user => {
                                return <tr>
                                    <td>{user.username}</td>
                                    <td>{user.mail}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    { user.boughtItems != undefined ? <td>{user.boughtItems}</td> : <td>none</td>}
                                </tr>
                            }) : <></>
                        }

                    </tbody>
                    </table>
            </div>
        )
    }
}
